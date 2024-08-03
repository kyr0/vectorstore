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

export interface ProductQuantizer {
    centroids: Array<Vectors>;
}

export interface Means {
    centroids: Vectors;
    assignments: Array<number>;
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
    dimensionality: 1024,
    numClusters: 65536,
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
    engine.centroids = initializeCentroidsKMeansPlusPlus(vectors, k, engine.seed);
    
    // Assign vectors to clusters based on the nearest centroid
    for (const cluster of engine.clusters) {
        cluster.vectors.clear();
    }
    
    for (const [key, vector] of engine.index.entries()) {
        let bestIndex = 0;
        let bestDistance = -dotProduct([vector], [engine.centroids[0]])[0];
        for (let i = 1; i < k; i++) {
            const distance = -dotProduct([vector], [engine.centroids[i]])[0];
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
        index: new Map<string, Vector | Uint8Array>(),
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
    const length = Math.sqrt(dotProduct([vector], [vector])[0]); // TODO: generalize to other metrics
    if (length === 0) return vector;
    return new Float32Array(vector.map(val => val / length));
}

/**
 * k-means clustering algorithm to partition data points into k clusters.
 * @param vectors - The list of vectors to be clustered.
 * @param k - The number of clusters.
 * @param initialCentroids - Initial centroids to use for k-means.
 * @param maxIterations - Maximum number of iterations to run the algorithm.
 * @returns The centroids and assignments of the vectors to clusters.
 */
export function kMeans(vectors: Vectors, k: number, initialCentroids: Vectors = [], maxIterations = 100): Means {
    if (vectors[0].length < MIN_DIMENSIONS) {
        throw new Error(`Vectors must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
    }

    const dimension = vectors[0].length;
    const centroids = initialCentroids.length === k ? initialCentroids : initializeCentroids(vectors, k);
    const assignments = new Array(vectors.length).fill(0);
    let iterations = 0;
    let hasChanged = true;

    while (iterations < maxIterations && hasChanged) {
        hasChanged = false;

        // Assign vectors to the nearest centroid
        for (let i = 0; i < vectors.length; i++) {
            let bestIndex = 0;
            let bestDistance = -dotProduct([vectors[i]], [centroids[0]])[0]; // Minimize dot product for distance
            for (let j = 1; j < k; j++) {
                const distance = -dotProduct([vectors[i]], [centroids[j]])[0]; // Minimize dot product for distance
                if (distance < bestDistance) {
                    bestIndex = j;
                    bestDistance = distance;
                }
            }
            if (assignments[i] !== bestIndex) {
                assignments[i] = bestIndex;
                hasChanged = true;
            }
        }

        // Update centroids
        const sums = Array.from({ length: k }, () => new Float32Array(dimension));
        const counts = new Array(k).fill(0);
        for (let i = 0; i < vectors.length; i++) {
            const cluster = assignments[i];
            for (let j = 0; j < dimension; j++) {
                sums[cluster][j] += vectors[i][j];
            }
            counts[cluster]++;
        }

        for (let j = 0; j < k; j++) {
            if (counts[j] === 0) continue;
            for (let d = 0; d < dimension; d++) {
                centroids[j][d] = sums[j][d] / counts[j];
            }
        }

        iterations++;
    }

    return { centroids, assignments };
}

/**
 * Initialize centroids randomly from the input vectors.
 * @param vectors - The list of vectors to choose from.
 * @param k - The number of centroids to initialize.
 * @param seed - Seed for random number generation.
 * @returns An array of centroids.
 */
export function initializeCentroids(vectors: Vectors, k: number, seed?: number): Vector[] {
    const centroids = [];
    const seen = new Set<number>();
    const random = getSeededRandomFn(seed || Math.random());

    while (centroids.length < k) {
        const idx = Math.floor(random() * vectors.length);
        if (!seen.has(idx)) {
            centroids.push(vectors[idx].slice());
            seen.add(idx);
        }
    }

    return centroids;
}

/**
 * Initialize centroids using k-means++ algorithm.
 * @param vectors - The list of vectors to choose from.
 * @param k - The number of centroids to initialize.
 * @param seed - Seed for random number generation.
 * @returns An array of centroids.
 */
export function initializeCentroidsKMeansPlusPlus(vectors: Vectors, k: number, seed?: number): Vector[] {
    const centroids: Vector[] = [];
    const distances: number[] = new Array(vectors.length).fill(Infinity);
    const random = getSeededRandomFn(seed || Math.random());

    // Choose the first centroid randomly
    centroids.push(vectors[Math.floor(random() * vectors.length)]);

    while (centroids.length < k) {
        // Update distances with the nearest centroid
        for (let i = 0; i < vectors.length; i++) {
            const distance = Math.min(...centroids.map(centroid => -dotProduct([vectors[i]], [centroid])[0]));
            distances[i] = Math.min(distances[i], distance);
        }

        // Choose the next centroid probabilistically
        const totalDistance = distances.reduce((sum, d) => sum + d, 0);
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

// Product Quantization (PQ) functions

/**
 * Train the Product Quantizer (PQ) by clustering sub-vectors of the input vectors.
 * @param vectors - The list of vectors to be used for training the PQ.
 * @param engine - The vector search engine instance.
 * @returns The trained Product Quantizer with centroids for each sub-vector.
 */
/*
export function trainProductQuantizer(vectors: Vectors, engine: VectorSearchEngine): ProductQuantizer {
    if (vectors[0].length < MIN_DIMENSIONS) {
        throw new Error(`Vectors must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
    }

    const { dimensionality: dimension, subvectorDimensions, centroidsPerSubvector } = engine;

    // Initialize the Product Quantizer with an empty centroids array
    const pq: ProductQuantizer = { centroids: [] };

    // For each sub-vector dimension, perform k-means clustering to find centroids
    for (let i = 0; i < dimension / subvectorDimensions; i++) {
        // Extract the sub-vectors for the current dimension
        const subvectors = vectors.map(vector => vector.subarray(i * subvectorDimensions, (i + 1) * subvectorDimensions));

        // Perform k-means clustering on the sub-vectors to find centroids
        const { centroids } = kMeans(subvectors, centroidsPerSubvector);

        // Store the centroids for the current sub-vector dimension in the PQ
        pq.centroids.push(centroids);
    }

    // Return the trained Product Quantizer
    return pq;
}
*/

/**
 * Compress a vector using the trained Product Quantizer (PQ).
 * @param vector - The vector to be compressed.
 * @param pq - The trained Product Quantizer.
 * @param engine - The vector search engine instance.
 * @returns The compressed vector as an array of centroid indices.
 */
/*
export function compressVector(vector: Vector, pq: ProductQuantizer, engine: VectorSearchEngine): Uint8Array {
    if (vector.length < MIN_DIMENSIONS) {
        throw new Error(`Vector must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
    }

    const { dimensionality: dimension, subvectorDimensions, centroidsPerSubvector } = engine;
    const subvectors = dimension / subvectorDimensions;

    // Initialize an array to store the indices of the closest centroids for each sub-vector
    const compressed = new Uint8Array(subvectors);

    // For each sub-vector dimension, find the closest centroid
    for (let i = 0; i < subvectors; i++) {
        // Extract the sub-vector for the current dimension
        const subvector = vector.subarray(i * subvectorDimensions, (i + 1) * subvectorDimensions);

        // Initialize variables to find the best centroid
        let bestIndex = 0;
        let bestDistance = -engine.metric([subvector], [pq.centroids[i][0]])[0]; // Minimize dot product for distance

        // Compare the sub-vector with all centroids to find the closest one
        for (let j = 1; j < centroidsPerSubvector; j++) {
            const distance = -engine.metric([subvector], [pq.centroids[i][j]])[0]; // Minimize dot product for distance
            if (distance < bestDistance) {
                bestIndex = j;
                bestDistance = distance;
            }
        }

        // Store the index of the closest centroid for the current sub-vector
        compressed[i] = bestIndex;
    }

    // Return the compressed vector as an array of centroid indices
    return compressed;
}
*/

/**
 * Decompress a compressed vector using the trained Product Quantizer (PQ).
 * @param compressedVector - The compressed vector as an array of centroid indices.
 * @param pq - The trained Product Quantizer.
 * @param engine - The vector search engine instance.
 * @returns The decompressed vector.
 */
/*
export function decompressVector(compressedVector: Uint8Array, pq: ProductQuantizer, engine: VectorSearchEngine): Vector {
    const { dimensionality: dimension, subvectorDimensions } = engine;
    const subvectors = dimension / subvectorDimensions;

    // Initialize an array to store the decompressed vector
    const decompressed = new Float32Array(dimension);

    // For each sub-vector dimension, retrieve the corresponding centroid from the PQ
    for (let i = 0; i < subvectors; i++) {
        // Retrieve the centroid for the current sub-vector
        const centroid = pq.centroids[i][compressedVector[i]];

        // Set the values of the decompressed vector for the current sub-vector dimension
        decompressed.set(centroid, i * subvectorDimensions);
    }

    // Return the decompressed vector
    return decompressed;
}
*/

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

    // Update centroids using k-means++
    if (engine.index.size >= engine.numClusters) {
        updateCentroidsKMeansPlusPlus(engine.numClusters, engine);
    }
}


/**
 * Remove a vector from the engine index
 * @param key - Unique identifier for the vector.
 * @param engine - The vector search engine instance.
 */
export function removeVector(key: string, engine: VectorSearchEngine): void {
    if (engine.index.has(key)) {
        engine.index.delete(key);
    }
}

// Calculate within-cluster sum of squares (WCSS) for a given clustering result
export const calculateWCSS = (vectors: Vectors, centroids: Vectors, assignments: number[], engine: VectorSearchEngine): number => {
    let wcss = 0;
    for (let i = 0; i < vectors.length; i++) {
        const clusterIdx = assignments[i];
        const vector = vectors[i];
        const centroid = centroids[clusterIdx];
        const distance = engine.metric([normalizeVector(vector)], [normalizeVector(centroid)])[0];
        wcss += distance * distance;
    }
    return wcss;
};

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

    for (const [key, indexedValue] of engine.index.entries()) {
        const similarity = engine.metric([queryVector], [indexedValue]);
        results.push({ key, similarity: similarity[0] });
    }

    return results
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK);
}

/**
 * Optimized search using centroid proximity
 * @param vector - The query vector.
 * @param topK - Number of top similar vectors to return.
 * @param engine - The vector search engine instance.
 * @returns The top K most similar vectors.
 */
export function searchLimited(vector: Vector, topK: number, engine: VectorSearchEngine): SearchResults {
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
        for (const [key, indexedValue] of cluster.vectors.entries()) {
            const similarity = engine.metric([queryVector], [indexedValue]);
            results.push({ key, similarity: similarity[0] });
        }
    }

    // Sort results by similarity in descending order
    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
}