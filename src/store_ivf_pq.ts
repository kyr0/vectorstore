import { dotProduct, initWasm } from "fast-dotproduct";
await initWasm();

export type Vector = Float32Array;
export type Vectors = Array<Vector>;

export interface Cluster {
    centroid: Vector;
    vectors: Map<string, Vector>;
}

export type DistanceMetric = 'dot-product';

export type MetricFn = (a: Vectors, b: Vectors) => Float32Array;
export type RandomFn = () => number;

export const getSeededRandomFn = (seed: number) => () => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
};

export interface VectorSearchEngine {
    clusters: Array<Cluster>;
    dimensionality: number;
    numClusters: number;
    index: Map<string, Vector>; // Index for storing vectors directly or compressed vectors
    centroids: Vectors; // Add centroids to the engine state
    normalize: boolean; // Whether to normalize vectors
    distanceMetric: DistanceMetric;
    metric: MetricFn;
    random: RandomFn;
    subvectorDimensions: number;
    centroidsPerSubvector: number;
    seed?: number;
}

export interface Means {
    centroids: Vectors;
    assignments: Uint32Array;
}

export interface SearchResult {
    key: string;
    similarity: number;
}

export type SearchResults = Array<SearchResult>;

export const MIN_DIMENSIONS = 4;

// --- vector distance metric functions

export const dotProductMetric = dotProduct;

// --- default engine options

const randomSeed = Math.random();

export const defaultEngineOptions: Partial<VectorSearchEngine> = {
    dimensionality: 128,
    numClusters: 2, // For simplicity, we use 2 clusters for the test case
    normalize: true,
    distanceMetric: 'dot-product',
    subvectorDimensions: 8,
    centroidsPerSubvector: 256, // numClusters / 256
    seed: randomSeed
};

export const updateCentroidsKMeansPlusPlus = function (k: number, engine: VectorSearchEngine): void {
    const vectors: Vectors = Array.from(engine.index.values()) as Vectors;
    if (vectors.length < k) {
        throw new Error('Not enough vectors to initialize the requested number of centroids.');
    }
    engine.centroids = initializeCentroidsKMeansPlusPlus(vectors, k, engine.metric, engine.seed);

    // Assign vectors to clusters based on the nearest centroid
    for (const cluster of engine.clusters) {
        cluster.vectors.clear();
    }

    for (const [key, vector] of engine.index.entries()) {
        let bestIndex = 0;
        let bestDistance = -engine.metric([vector], [engine.centroids[0]])[0];
        for (let i = 1; i < k; i++) {
            const distance = -engine.metric([vector], [engine.centroids[i]])[0];
            if (distance < bestDistance) {
                bestIndex = i;
                bestDistance = distance;
            }
        }
        engine.clusters[bestIndex].vectors.set(key, vector);
    }
};

export const selectMetricFunction = function (engine: VectorSearchEngine): MetricFn {
    switch (engine.distanceMetric) {
        case 'dot-product':
            return dotProductMetric;
        default:
            throw new Error(`Unknown distance metric: ${engine.distanceMetric}`);
    }
};

// Initialize the vector search engine with default values
export const createEngine = (options: Partial<VectorSearchEngine> = defaultEngineOptions): VectorSearchEngine => {
    const dimension = options.dimensionality ?? defaultEngineOptions.dimensionality;
    const numClusters = options.numClusters ?? defaultEngineOptions.numClusters;
    const seed = options.seed ?? defaultEngineOptions.seed;

    if (dimension < MIN_DIMENSIONS) {
        throw new Error(`dimension must be at least ${MIN_DIMENSIONS}`);
    }

    const engine: VectorSearchEngine = {
        clusters: [],
        index: new Map<string, Vector>(),
        centroids: [],
        ...defaultEngineOptions,
        ...options,
        dimensionality: dimension,
        numClusters,
        seed,
    } as VectorSearchEngine;

    const selectedMetricFn = selectMetricFunction(engine);

    engine.metric = typeof options.metric === "function" ?
        options.metric :
        typeof selectedMetricFn === "function" ?
            selectedMetricFn :
            dotProductMetric; // Default to dot product

    engine.random = typeof options.random === "function" ? engine.random : getSeededRandomFn(seed);

    // Initialize clusters with empty centroids
    for (let i = 0; i < numClusters; i++) {
        engine.clusters.push({
            centroid: new Float32Array(dimension),
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
export function normalizeVector(vector: Vector): Vector {
    const length = Math.sqrt(dotProduct([vector], [vector])[0]);
    if (length === 0) return vector;
    const normalizedVector = new Float32Array(vector.length);
    for (let i = 0; i < vector.length; i++) {
        normalizedVector[i] = vector[i] / length;
    }
    return normalizedVector;
}

/**
 * Initialize centroids using k-means++ algorithm.
 * @param vectors - The list of vectors to choose from.
 * @param k - The number of centroids to initialize.
 * @param metric - The metric function to use for distance calculation.
 * @param seed - Seed for random number generation.
 * @returns An array of centroids.
 */
export function initializeCentroidsKMeansPlusPlus(vectors: Vectors, k: number, metric: MetricFn, seed?: number): Vector[] {
    const centroids: Vector[] = [];
    const distances: Float64Array = new Float64Array(vectors.length).fill(Infinity);
    const random = getSeededRandomFn(seed || Math.random());

    // Choose the first centroid randomly
    centroids.push(vectors[Math.floor(random() * vectors.length)]);

    while (centroids.length < k) {
        let totalDistance = 0;

        // Update distances with the nearest centroid
        for (let i = 0; i < vectors.length; i++) {
            const distance = Math.min(distances[i], -metric([vectors[i]], [centroids[centroids.length - 1]])[0]);
            distances[i] = distance;
            totalDistance += distance;
        }

        // Choose the next centroid probabilistically
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
export function updateCentroidIncrementally(cluster: Cluster, vector: Vector): void {
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
export function assignToCluster(key: string, vector: Vector, engine: VectorSearchEngine): void {
    let bestIndex = 0;
    let bestDistance = -engine.metric([vector], [engine.clusters[0].centroid])[0];

    for (let i = 1; i < engine.numClusters; i++) {
        const distance = -engine.metric([vector], [engine.clusters[i].centroid])[0];
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
export function addVector(key: string, vector: Vector, engine: VectorSearchEngine): void {
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Vector must be of dimensionality ${engine.dimensionality}`);
    }

    if (engine.normalize) {
        vector = normalizeVector(vector);
    }

    engine.index.set(key, vector);

    // Assign the vector to the nearest cluster and update the centroid
    assignToCluster(key, vector, engine);
}

/**
 * Remove a vector from the engine index
 * @param key - Unique identifier for the vector.
 * @param engine - The vector search engine instance.
 */
export function removeVector(key: string, engine: VectorSearchEngine): void {
    if (engine.index.has(key)) {
        const vector = engine.index.get(key);
        engine.index.delete(key);

        // Find and remove the vector from its cluster
        for (const cluster of engine.clusters) {
            if (cluster.vectors.has(key)) {
                cluster.vectors.delete(key);
                break;
            }
        }

        // Optionally, update the centroid here or defer until necessary
    }
}

/**
 * Search for the most similar vectors in the engine index
 * @param vector - The query vector.
 * @param topK - Number of top similar vectors to return.
 * @param engine - The vector search engine instance.
 * @returns The top K most similar vectors.
 */
export function search(vector: Vector, topK: number, engine: VectorSearchEngine): SearchResults {
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Query vector must be of dimension ${engine.dimensionality}`);
    }

    const results: SearchResults = [];
    const queryVector = engine.normalize ? normalizeVector(vector) : vector;
    const entries = Array.from(engine.index.entries());

    for (let i = 0; i < entries.length; i++) {
        const [key, indexedValue] = entries[i];
        const similarity = engine.metric([queryVector], [indexedValue])[0];

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
export function searchWithProximity(vector: Vector, topK: number, engine: VectorSearchEngine): SearchResults {
    if (vector.length !== engine.dimensionality) {
        throw new Error(`Query vector must be of dimension ${engine.dimensionality}`);
    }

    const queryVector = engine.normalize ? normalizeVector(vector) : vector;
    const results: SearchResults = [];

    // Step 1: Find the closest centroids
    const centroidSimilarities = engine.centroids.map((centroid, index) => ({
        index,
        similarity: engine.metric([queryVector], [centroid])[0]
    }));

    // Sort centroids by similarity in descending order
    centroidSimilarities.sort((a, b) => b.similarity - a.similarity);

    // Get the indices of the top K closest centroids
    const topCentroidIndices = centroidSimilarities.slice(0, Math.min(topK, centroidSimilarities.length)).map(item => item.index);

    // Step 2: Search vectors in the clusters of the closest centroids
    for (const clusterIndex of topCentroidIndices) {
        const cluster = engine.clusters[clusterIndex];

        cluster.vectors.forEach((indexedValue, key) => {
            const similarity = engine.metric([queryVector], [indexedValue])[0];
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
