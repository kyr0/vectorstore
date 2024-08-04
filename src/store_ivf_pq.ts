import { singleDotProductWasm, initWasm } from "fast-dotproduct";

// Initialize the WebAssembly module
await initWasm();

// === Interfaces and Types ===

export type Vector = Float32Array;
export type Vectors = Array<Vector>;

export interface Cluster {
    centroid: Vector;
    vectors: Map<string, Vector>;
}

export type DistanceMetric = 'dot-product';

export type MetricFn = (a: Vector, b: Vector) => number;
export type RandomFn = () => number;

export interface VectorSearchEngine {
    // dimensionality of the vectors, automatically set on first add if not provided
    dimensionality: number;
    // number of clusters (k-means), elbowed if not provided
    numClusters: number;
    // list of clusters
    clusters: Array<Cluster>;
    // actual vector backing store
    index: Map<string, Vector>;
    // centroids of the clusters (k-means)
    centroids: Vectors; 
    // whether to normalize vectors
    normalize: boolean; 
    // distance metric function (dot product by default)
    distanceMetric: DistanceMetric;
    // distance metric function reference, referenced for performance
    metric: MetricFn;
    // seeded random number generator function, referenced for performance
    random: RandomFn;
    // seed for random number generator, defaults to 42
    seed: number;
}

export interface SerializedVectorSearchEngine {
    clusters: Array<{
        centroid: ArrayBuffer;
        vectors: { [key: string]: ArrayBuffer };
    }>;
    dimensionality: number;
    numClusters: number;
    index: { [key: string]: ArrayBuffer };
    centroids: Array<ArrayBuffer>;
    normalize: number; // 0 for false, 1 for true
    distanceMetric: DistanceMetric;
    seed?: number;
}

export interface SearchResult {
    key: string;
    similarity: number;
}

export type SearchResults = Array<SearchResult>;

// === Constants, Defaults ===

// minimum dimensionality for vectors, this is a hard requirement for vector instruction optimization (SIMD)
export const MIN_DIMENSIONS = 4;
// default seed for random number generator, for reproducibility
export const DEFAULT_SEED = 42;
// should have at least 2 vectors added, so 2 is always a safe assumption
export const DEFAULT_NUM_CLUSTERS = 2;
// dot product works best for high-dimensional sparse vectors (e.g. text embeddings, searching for similar documents)
export const DEFAULT_DISTANCE_METRIC: DistanceMetric = 'dot-product';

// --- default engine options
export const DEFAULT_ENGINE_OPTIONS: Partial<VectorSearchEngine> = {
    dimensionality: MIN_DIMENSIONS,
    numClusters: DEFAULT_NUM_CLUSTERS,
    normalize: true,
    distanceMetric: DEFAULT_DISTANCE_METRIC,
    seed: DEFAULT_SEED
};

// === Distance Metric Selection ===

export const selectMetricFunction =  (distanceMetric: DistanceMetric): MetricFn => {
    switch (distanceMetric) {
        case 'dot-product':
            return singleDotProductWasm;
        default:
            throw new Error(`Unknown distance metric: ${distanceMetric}`);
    }
};

// === Seeded Random Number Generation (SRNG) ===

export const getSeededRandomFn = (seed: number) => () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

// === Engine Management ===

export const createEngine = (options: Partial<VectorSearchEngine> = DEFAULT_ENGINE_OPTIONS): VectorSearchEngine => {
    const dimensionality = options.dimensionality ?? DEFAULT_ENGINE_OPTIONS.dimensionality;
    const numClusters = options.numClusters ?? DEFAULT_ENGINE_OPTIONS.numClusters;
    const seed = options.seed ?? DEFAULT_ENGINE_OPTIONS.seed;

    if (dimensionality < MIN_DIMENSIONS) {
        throw new Error(`dimension must be at least ${MIN_DIMENSIONS}`);
    }

    const engine: VectorSearchEngine = {
        clusters: [],
        index: new Map<string, Vector>(),
        centroids: [],
        ...DEFAULT_ENGINE_OPTIONS,
        ...options,
        dimensionality,
        numClusters,
        seed,
    } as VectorSearchEngine;

    const selectedMetricFn = selectMetricFunction(engine.distanceMetric);

    engine.metric = typeof options.metric === "function" ?
        options.metric :
        typeof selectedMetricFn === "function" ?
            selectedMetricFn :
            singleDotProductWasm; // Default to dot product

    engine.random = typeof options.random === "function" ? engine.random : getSeededRandomFn(seed);

    // Initialize clusters with empty centroids
    for (let i = 0; i < numClusters; i++) {
        engine.clusters.push({
            centroid: new Float32Array(dimensionality),
            vectors: new Map<string, Vector>(),
        });
    }
    return engine;
};

/**
 * Normalize a vector to unit length.
 * @param vector - The vector to normalize.
 * @returns The normalized vector.
 */
export const normalizeVector = (vector: Vector): Vector => {
    const length = Math.sqrt(singleDotProductWasm(vector, vector));
    if (length === 0) return vector;
    const normalizedVector = new Float32Array(vector.length);
    for (let i = 0; i < vector.length; i++) {
        normalizedVector[i] = vector[i] / length;
    }
    return normalizedVector;
}

// === Clustering and Index Management ===

/**
 * Initialize centroids using k-means++ algorithm.
 * @param vectors - The list of vectors to choose from.
 * @param k - The number of centroids to initialize.
 * @param metric - The metric function to use for distance calculation.
 * @param seed - Seed for random number generation.
 * @returns An array of centroids.
 */
export const initializeCentroidsWithVectors = (vectors: Vectors, k: number, metric: MetricFn, seed?: number): Vectors => {
    const centroids: Vectors = [];
    const distances: Float64Array = new Float64Array(vectors.length).fill(Infinity);
    const random = getSeededRandomFn(seed || DEFAULT_SEED);

    // choose the first centroid randomly
    centroids.push(vectors[Math.floor(random() * vectors.length)]);

    while (centroids.length < k) {
        let totalDistance = 0;

        // update distances with the nearest centroid
        for (let i = 0; i < vectors.length; i++) {
            const distance = Math.min(distances[i], -metric(vectors[i], centroids[centroids.length - 1]));
            distances[i] = distance;
            totalDistance += distance;
        }

        // choose the next centroid probabilistically
        const threshold = random() * totalDistance;
        let cumulativeDistance = 0;

        for (let i = 0; i < vectors.length; i++) {
            cumulativeDistance += distances[i];
            if (cumulativeDistance >= threshold) {
                centroids.push(vectors[i]);
                break;
            }
        }
    }
    return centroids;
}

/**
 * Incrementally update the centroid of a cluster.
 * @param cluster - The cluster to update.
 * @param vector - The new vector added to the cluster.
 */
export const updateCentroidIncrementally = (cluster: Cluster, vector: Vector): void => {
    const newCentroid = new Float32Array(cluster.centroid.length);
    const numVectors = cluster.vectors.size;

    for (let i = 0; i < newCentroid.length; i++) {
        newCentroid[i] = (cluster.centroid[i] * numVectors + vector[i]) / (numVectors + 1);
    }
    cluster.centroid.set(newCentroid);
}

/**
 * Assign a vector to the nearest cluster and update the cluster's centroid incrementally.
 * @param key - Unique identifier for the vector.
 * @param vector - The vector to be assigned.
 * @param engine - The vector search engine instance.
 */
export const assignToCluster = (key: string, vector: Vector, engine: VectorSearchEngine): void => {
    let bestIndex = 0;
    let bestDistance = -engine.metric(vector, engine.clusters[0].centroid);

    for (let i = 1; i < engine.numClusters; i++) {
        const distance = -engine.metric(vector, engine.clusters[i].centroid);
        if (distance < bestDistance) {
            bestIndex = i;
            bestDistance = distance;
        }
    }

    const cluster = engine.clusters[bestIndex];
    cluster.vectors.set(key, vector);
    updateCentroidIncrementally(cluster, vector);
}


/**
 * Add a vector to the engine index
 * @param key - Unique identifier for the vector.
 * @param vector - The vector to be added.
 * @param engine - The vector search engine instance.
 */
export const addVector = (key: string, vector: Vector, engine: VectorSearchEngine): void => {

    // cannot compare vectors of different dimensionality, would be like comparing apples to oranges
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Vector must be of dimensionality ${engine.dimensionality}`);
    }

    // normalize the vector to unit length
    if (engine.normalize) {
        vector = normalizeVector(vector);
    }

    engine.index.set(key, vector);

    // assign the vector to the nearest cluster and update the centroid
    assignToCluster(key, vector, engine);
}


/**
 * Incrementally update the centroid of a cluster when a vector is removed.
 * @param cluster - The cluster to update.
 * @param vector - The vector being removed from the cluster.
 */
export const removeVectorFromCluster = (cluster: Cluster, vector: Vector): void => {
    const newCentroid = new Float32Array(cluster.centroid.length);
    const numVectors = cluster.vectors.size;

    if (numVectors === 0) return;

    for (let i = 0; i < newCentroid.length; i++) {
        newCentroid[i] = (cluster.centroid[i] * (numVectors + 1) - vector[i]) / numVectors;
    }
    cluster.centroid.set(newCentroid);
}

/**
 * Remove a vector from the engine index
 * @param key - Unique identifier for the vector.
 * @param engine - The vector search engine instance.
 */
export const removeVector = (key: string, engine: VectorSearchEngine): void => {
    if (engine.index.has(key)) {
        const vector = engine.index.get(key);
        engine.index.delete(key);

        // find and remove the vector from its cluster
        for (const cluster of engine.clusters) {
            if (cluster.vectors.has(key)) {
                cluster.vectors.delete(key);
                removeVectorFromCluster(cluster, vector);
                break;
            }
        }
    }
}

// === Elbow Method, Optimizing Clusters and Centroids ===

export const calculateInertia = (engine: VectorSearchEngine): number => {
    let inertia = 0;
    for (const cluster of engine.clusters) {
        for (const vector of cluster.vectors.values()) {
            inertia += -engine.metric(vector, cluster.centroid);
        }
    }
    return inertia;
}

export const findBestNumClusters = (vectors: Vectors, maxClusters: number, engine: VectorSearchEngine): number => {
    const inertias: Array<number> = [];
    for (let k = 1; k <= maxClusters; k++) {
        const testEngine = createEngine({ numClusters: k, metric: engine.metric, seed: engine.seed, dimensionality: engine.dimensionality });
        vectors.forEach((vector, index) => addVector(index.toString(), vector, testEngine));
        inertias.push(calculateInertia(testEngine));
    }

    let bestNumClusters = 1;
    for (let i = 1; i < inertias.length; i++) {
        if (inertias[i - 1] - inertias[i] < inertias[i] - (inertias[i + 1] || 0)) {
            bestNumClusters = i;
            break;
        }
    }

    return bestNumClusters;
}


export const updateIndex = (engine: VectorSearchEngine): void => {
    const vectors: Vectors = Array.from(engine.index.values()) as Vectors;

   // Determine the best number of clusters if k is not provided
   const k = findBestNumClusters(vectors, 10, engine);

   // enough vectors to update the number of clusters
   if (vectors.length >= k) {
        // update the number of clusters
        engine.numClusters = k;
   }
    engine.centroids = initializeCentroidsWithVectors(vectors, k, engine.metric, engine.seed);

    for (const cluster of engine.clusters) {
        cluster.vectors.clear();
    }

    for (const [key, vector] of engine.index.entries()) {
        let bestIndex = 0;
        let bestDistance = -engine.metric(vector, engine.centroids[0]);
        for (let i = 1; i < k; i++) {
            const distance = -engine.metric(vector, engine.centroids[i]);
            if (distance < bestDistance) {
                bestIndex = i;
                bestDistance = distance;
            }
        }
        engine.clusters[bestIndex].vectors.set(key, vector);
    }
};

// === Search ===

/**
 * Search for the most similar vectors in the engine index
 * @param vector - The query vector.
 * @param topK - Number of top similar vectors to return.
 * @param engine - The vector search engine instance.
 * @returns The top K most similar vectors.
 */
export const search = (vector: Vector, topK: number, engine: VectorSearchEngine): SearchResults => {
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Query vector must be of dimension ${engine.dimensionality}`);
    }

    const results: SearchResults = [];
    const queryVector = engine.normalize ? normalizeVector(vector) : vector;
    const entries = Array.from(engine.index.entries());

    for (let i = 0; i < entries.length; i++) {
        const [key, indexedValue] = entries[i];
        const similarity = engine.metric(queryVector, indexedValue);

        if (results.length < topK) {
            results.push({ key, similarity });
            results.sort((a, b) => b.similarity - a.similarity);
        } else if (similarity > results[results.length - 1].similarity) {
            results[results.length - 1] = { key, similarity };
            results.sort((a, b) => b.similarity - a.similarity);
        }
    }
    return results.slice(0, topK);
}

/**
 * Optimized search using centroid proximity and direct comparisons
 * @param vector - The query vector.
 * @param topK - Number of top similar vectors to return.
 * @param engine - The vector search engine instance.
 * @returns The top K most similar vectors.
 */
export const searchWithProximity = (vector: Vector, topK: number, engine: VectorSearchEngine): SearchResults => {
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Query vector must be of dimension ${engine.dimensionality}`);
    }

    const queryVector = engine.normalize ? normalizeVector(vector) : vector;
    const results: SearchResults = [];

    // find the closest centroids
    const centroidSimilarities = engine.centroids.map((centroid, index) => ({
        index,
        similarity: engine.metric(queryVector, centroid)
    }));

    // sort centroids by similarity in descending order
    centroidSimilarities.sort((a, b) => b.similarity - a.similarity);

    // get the indices of the top K closest centroids
    const topCentroidIndices = centroidSimilarities.slice(0, Math.min(topK, centroidSimilarities.length)).map(item => item.index);

    // search vectors in the clusters of the closest centroids
    for (const clusterIndex of topCentroidIndices) {
        const cluster = engine.clusters[clusterIndex];

        cluster.vectors.forEach((indexedValue, key) => {
            const similarity = engine.metric(queryVector, indexedValue);
            if (results.length < topK) {
                results.push({ key, similarity });
                results.sort((a, b) => b.similarity - a.similarity);
            } else if (similarity > results[results.length - 1].similarity) {
                results[results.length - 1] = { key, similarity };
                results.sort((a, b) => b.similarity - a.similarity);
            }
        });
    }
    return results.slice(0, topK);
}

// === Engine Runtime State Serialization/Deserialization ===

const arrayToBuffer = (arr: Float32Array): ArrayBuffer => arr.buffer.slice(0);
const bufferToArray = (buffer: ArrayBuffer): Float32Array => new Float32Array(buffer)

export const toSerialization = (engine: VectorSearchEngine): SerializedVectorSearchEngine => {
    const serializeCluster = (cluster: Cluster) => {
        const vectors: { [key: string]: ArrayBuffer } = {};
        cluster.vectors.forEach((value, key) => {
            vectors[key] = arrayToBuffer(value);
        });
        return {
            centroid: arrayToBuffer(cluster.centroid),
            vectors
        };
    };

    const clusters = engine.clusters.map(serializeCluster);
    const index: { [key: string]: ArrayBuffer } = {};
    engine.index.forEach((value, key) => {
        index[key] = arrayToBuffer(value);
    });
    const centroids = engine.centroids.map(arrayToBuffer);

    return {
        clusters,
        dimensionality: engine.dimensionality,
        numClusters: engine.numClusters,
        index,
        centroids,
        normalize: engine.normalize ? 1 : 0,
        distanceMetric: engine.distanceMetric,
        seed: engine.seed
    };
};

export const createFromSerialization = async (data: SerializedVectorSearchEngine): Promise<VectorSearchEngine> => {
    const deserializeCluster = async (data: any): Promise<Cluster> => {
        const centroid = bufferToArray(data.centroid);
        const vectors = new Map<string, Vector>();
        for (const key in data.vectors) {
            vectors.set(key, bufferToArray(data.vectors[key]));
        }
        return { centroid, vectors };
    };

    const clusters = await Promise.all(data.clusters.map(deserializeCluster));
    const index = new Map<string, Vector>();
    for (const key in data.index) {
        index.set(key, bufferToArray(data.index[key]));
    }
    const centroids = await Promise.all(data.centroids.map(bufferToArray));

    const metric = selectMetricFunction(data.distanceMetric);

    return {
        clusters,
        dimensionality: data.dimensionality,
        numClusters: data.numClusters,
        index,
        centroids,
        normalize: data.normalize === 1,
        distanceMetric: data.distanceMetric,
        metric,
        random: getSeededRandomFn(data.seed || 0),
        seed: data.seed
    };
};

export const serializeToString = (serializedEngine: SerializedVectorSearchEngine): string => 
    JSON.stringify(serializedEngine, (key, value) =>
        value instanceof ArrayBuffer
            ? Array.from(new Uint8Array(value))
            : value
    );

export const serializedFromString = (encodedEngine: string): SerializedVectorSearchEngine =>
    JSON.parse(encodedEngine, (key, value) =>
        Array.isArray(value) && value.length > 0 && typeof value[0] === 'number'
            ? new Uint8Array(value).buffer
            : value
    );