import { describe, it, expect } from 'vitest';
import { addVector, removeVector, search, Vector, MIN_DIMENSIONS, normalizeVector, updateCentroidsKMeansPlusPlus, initializeCentroidsKMeansPlusPlus, createEngine, Vectors, dotProductMetric, getSeededRandomFn, searchWithProximity, MetricFn, Means, VectorSearchEngine } from './store_ivf_pq';
import { MemoryUsageTracker } from './test/memory-tracker';


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
 * k-means clustering algorithm to partition data points into k clusters.
 * @param vectors - The list of vectors to be clustered.
 * @param k - The number of clusters.
 * @param metric - The metric function to use for distance calculation.
 * @param initialCentroids - Initial centroids to use for k-means.
 * @param maxIterations - Maximum number of iterations to run the algorithm.
 * @returns The centroids and assignments of the vectors to clusters.
 */
export function kMeans(vectors: Vectors, k: number, metric: MetricFn, initialCentroids: Vectors = [], maxIterations = 100): Means {
    if (vectors[0].length < MIN_DIMENSIONS) {
        throw new Error(`Vectors must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
    }

    const dimension = vectors[0].length;
    const centroids = initialCentroids.length === k ? initialCentroids : initializeCentroids(vectors, k);
    const assignments = new Uint32Array(vectors.length); // Use Uint32Array for better performance
    let iterations = 0;
    let hasChanged = true;

    const sums = Array.from({ length: k }, () => new Float32Array(dimension));
    const counts = new Uint32Array(k); // Use Uint32Array for better performance

    while (iterations < maxIterations && hasChanged) {
        hasChanged = false;

        // Assign vectors to the nearest centroid
        for (let i = 0; i < vectors.length; i++) {
            let bestIndex = 0;
            let bestDistance = -metric([vectors[i]], [centroids[0]])[0]; // Minimize metric for distance
            for (let j = 1; j < k; j++) {
                const distance = -metric([vectors[i]], [centroids[j]])[0]; // Minimize metric for distance
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

        // Clear sums and counts for new iteration
        for (let j = 0; j < k; j++) {
            sums[j].fill(0);
            counts[j] = 0;
        }

        // Accumulate sums and counts
        for (let i = 0; i < vectors.length; i++) {
            const cluster = assignments[i];
            for (let j = 0; j < dimension; j++) {
                sums[cluster][j] += vectors[i][j];
            }
            counts[cluster]++;
        }

        // Update centroids
        for (let j = 0; j < k; j++) {
            if (counts[j] === 0) continue;
            const count = counts[j];
            for (let d = 0; d < dimension; d++) {
                centroids[j][d] = sums[j][d] / count;
            }
        }

        iterations++;
    }

    return { centroids, assignments };
}

export function miniBatchKMeans(
    vectors: Vectors,
    k: number,
    metric: MetricFn,
    initialCentroids: Vectors = [],
    maxIterations = 100,
    batchSize = 100,
    seed: number = Math.random()
): Means {
    if (vectors[0].length < MIN_DIMENSIONS) {
        throw new Error(`Vectors must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
    }

    const dimension = vectors[0].length;
    const centroids = initialCentroids.length === k ? initialCentroids : initializeCentroidsKMeansPlusPlus(vectors, k, metric, seed);
    const assignments = new Uint32Array(vectors.length); // Use Uint32Array for better performance
    let iterations = 0;
    let hasChanged = true;

    const sums = Array.from({ length: k }, () => new Float32Array(dimension));
    const counts = new Uint32Array(k); // Use Uint32Array for better performance
    const random = getSeededRandomFn(seed);

    while (iterations < maxIterations && hasChanged) {
        hasChanged = false;

        // Sample a mini-batch
        const batchIndices = new Set<number>();
        while (batchIndices.size < batchSize) {
            batchIndices.add(Math.floor(random() * vectors.length));
        }

        // Clear sums and counts for new iteration
        for (let j = 0; j < k; j++) {
            sums[j].fill(0);
            counts[j] = 0;
        }

        // Assign vectors in the mini-batch to the nearest centroid and update sums and counts
        for (const i of batchIndices) {
            let bestIndex = 0;
            let bestDistance = -metric([vectors[i]], [centroids[0]])[0]; // Minimize metric for distance
            for (let j = 1; j < k; j++) {
                const distance = -metric([vectors[i]], [centroids[j]])[0]; // Minimize metric for distance
                if (distance < bestDistance) {
                    bestIndex = j;
                    bestDistance = distance;
                }
            }
            if (assignments[i] !== bestIndex) {
                assignments[i] = bestIndex;
                hasChanged = true;
            }
            const cluster = bestIndex;
            for (let d = 0; d < dimension; d++) {
                sums[cluster][d] += vectors[i][d];
            }
            counts[cluster]++;
        }

        // Update centroids
        for (let j = 0; j < k; j++) {
            if (counts[j] === 0) continue;
            const count = counts[j];
            for (let d = 0; d < dimension; d++) {
                centroids[j][d] = sums[j][d] / count;
            }
        }

        iterations++;
    }

    return { centroids, assignments };
}


// Calculate within-cluster sum of squares (WCSS) for a given clustering result
export const calculateWCSS = (vectors: Vectors, centroids: Vectors, assignments: Uint32Array, engine: VectorSearchEngine): number => {
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

describe('Vector Search Engine', () => {

    it('should add and remove vectors correctly', () => {
        const engine = createEngine({
            normalize: true,
        });
        const vector: Vector = new Float32Array(engine.dimensionality).fill(1);
        addVector('test', vector, engine);
        expect(engine.index.has('test')).toBe(true);
        removeVector('test', engine);
        expect(engine.index.has('test')).toBe(false);
    });

    it('should throw error for vectors with less than minimum dimensionality', () => {
        const engine = createEngine({
            normalize: true,
        });
        const smallVector: Vector = new Float32Array(MIN_DIMENSIONS - 1).fill(1);
        expect(() => addVector('small', smallVector, engine)).toThrowError(`Vector must be of dimensionality ${engine.dimensionality}`);
    });

    it('should search for similar vectors correctly', () => {
        const engine = createEngine({
            normalize: false,
        });
        const vector1: Vector = normalizeVector(new Float32Array(engine.dimensionality).fill(1));
        const vector2: Vector = normalizeVector(new Float32Array(engine.dimensionality).fill(2));
        addVector('vec1', vector1, engine);
        addVector('vec2', vector2, engine);

        const results = search(vector1, 2, engine);

        console.log("results", results);
        expect(results.length).toBe(2);
        expect(results[0].key).toBe('vec1');

        removeVector('vec1', engine);
        removeVector('vec2', engine);
    });

    it('should search for similar vectors correctly (auto-normalize)', () => {
        const engine = createEngine({
            normalize: true,
        });
        const vector1: Vector = new Float32Array(engine.dimensionality).fill(1);
        const vector2: Vector = new Float32Array(engine.dimensionality).fill(2);
        addVector('vec1', vector1, engine);
        addVector('vec2', vector2, engine);

        const results = search(vector1, 2, engine);

        console.log("results", results);
        expect(results.length).toBe(2);
        expect(results[0].key).toBe('vec1');

        removeVector('vec1', engine);
        removeVector('vec2', engine);
    });

    
    it('should normalize vectors correctly', () => {
        const vector: Vector = new Float32Array([1, 2, 3, 4]);
        const normalized = normalizeVector(vector);
        const length = Math.sqrt(dotProductMetric([normalized], [normalized])[0]);

        expect(length).toBeCloseTo(1);
    });

    it('should compare custom centroid initialization to random initialization', () => {
        const engine = createEngine({
            normalize: true,
        });
        const vectors: Vectors = [
            new Float32Array(engine.dimensionality).map(() => Math.random()),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 2),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 3),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 4),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 5),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 6),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 7),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 8),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 9),
            new Float32Array(engine.dimensionality).map(() => Math.random() * 10),
        ];

        // Add vectors to the search engine
        vectors.forEach((vector, index) => addVector(`vec${index + 1}`, vector, engine));

        // Initialize centroids using random initialization
        const randomCentroids = initializeCentroids(vectors, 2);
        console.log("Randomly Initialized Centroids:", randomCentroids);

        // Perform k-means clustering with random centroids
        const randomKMeansResult = kMeans(vectors, 2, engine.metric, randomCentroids);
        console.log("KMeans with Random Centroids:", randomKMeansResult);

        // Initialize centroids using k-means++
        const kMeansPlusPlusCentroids = initializeCentroidsKMeansPlusPlus(vectors, 2, engine.metric);
        console.log("KMeans++ Initialized Centroids:", kMeansPlusPlusCentroids);

        // Perform k-means clustering with k-means++ centroids
        const kMeansPlusPlusResult = kMeans(vectors, 2, engine.metric, kMeansPlusPlusCentroids);
        console.log("KMeans with KMeans++ Centroids:", kMeansPlusPlusResult);

        const randomWCSS = calculateWCSS(vectors, randomKMeansResult.centroids, randomKMeansResult.assignments, engine);
        const kMeansPlusPlusWCSS = calculateWCSS(vectors, kMeansPlusPlusResult.centroids, kMeansPlusPlusResult.assignments, engine);

        console.log("Random WCSS:", randomWCSS);
        console.log("KMeans++ WCSS:", kMeansPlusPlusWCSS);

        const isKMeansPlusPlusBetter = kMeansPlusPlusWCSS <= randomWCSS;

        console.log("Is KMeans++ Better?", isKMeansPlusPlusBetter);

        expect(isKMeansPlusPlusBetter).toBe(true); // KMeans++ should provide better or equal clustering
    });
    
    it('should update centroids using k-means++ and provide better clustering', () => {
        const engine = createEngine({
            normalize: true,
        });
    
        const initialVectors: Vector[] = Array.from({ length: 100 }, () => new Float32Array(engine.dimensionality).map(() => Math.random()));
    
        initialVectors.forEach((vector, index) => addVector(`initialVec${index + 1}`, vector, engine));
    
        const additionalVectors: Vector[] = Array.from({ length: 900 }, () => new Float32Array(engine.dimensionality).map(() => Math.random() * 10));
    
        additionalVectors.forEach((vector, index) => addVector(`additionalVec${index + 1}`, vector, engine));
    
        const allVectors = initialVectors.concat(additionalVectors);
    
        // Update centroids using k-means++ after adding vectors
        updateCentroidsKMeansPlusPlus(2, engine);
    
        // Perform k-means clustering with random centroids
        const randomCentroids = initializeCentroids(allVectors, 2);
        const randomKMeansResult = kMeans(allVectors, 2, engine.metric, randomCentroids, 100);
    
        // Perform k-means clustering with k-means++ centroids
        const kMeansPlusPlusCentroids = initializeCentroidsKMeansPlusPlus(allVectors, 2, engine.metric);
        const kMeansPlusPlusResult = kMeans(allVectors, 2, engine.metric, kMeansPlusPlusCentroids, 100);
    
        const randomWCSS = calculateWCSS(allVectors, randomKMeansResult.centroids, randomKMeansResult.assignments, engine);
        const kMeansPlusPlusWCSS = calculateWCSS(allVectors, kMeansPlusPlusResult.centroids, kMeansPlusPlusResult.assignments, engine);
    
        console.log("Random WCSS:", randomWCSS);
        console.log("KMeans++ WCSS:", kMeansPlusPlusWCSS);
    
        const isKMeansPlusPlusBetter = kMeansPlusPlusWCSS <= randomWCSS;
    
        console.log("Is KMeans++ Better?", isKMeansPlusPlusBetter);
    
        expect(isKMeansPlusPlusBetter).toBe(true); // KMeans++ should provide better or equal clustering
    });

    it('should use clusters for limited search with 100,000 vectors á 1.024 dimensions', () => {
        const engine = createEngine({
            dimensionality: 1024,
            numClusters: 64,
            normalize: true,
            distanceMetric: 'dot-product',
        });
    
        // Create random vectors for two clusters
        console.time("Creating Vectors");
        const random = getSeededRandomFn(42);
        const cluster1Vectors: Vectors = Array.from({ length: 50000 }, () => new Float32Array(1024).map(() => random() * 0.1));
        const cluster2Vectors: Vectors = Array.from({ length: 50000 }, () => new Float32Array(1024).map(() => random() * 10 + 100));
        console.timeEnd("Creating Vectors");
    
        const tracker = new MemoryUsageTracker();
        tracker.startTracking();
    
        console.time("Adding Vectors");
        // Add vectors to the engine
        cluster1Vectors.forEach((vector, index) => addVector(`cluster1_${index}`, vector, engine));
        cluster2Vectors.forEach((vector, index) => addVector(`cluster2_${index}`, vector, engine));
        console.timeEnd("Adding Vectors");
    
        // Update centroids
        updateCentroidsKMeansPlusPlus(64, engine);
    
        // Query vector close to cluster 2
        const queryVector = new Float32Array(1024).map(() => random() * 10 + 100);
    
        const { averageMemory } = tracker.stopTracking();
        console.log("benchmarked: total memory usage was:", averageMemory, "MiB");

        // Perform search
        console.time("Exact Search");
        const exactResults = search(queryVector, 5, engine);
        console.timeEnd("Exact Search");
    
        console.time("Proximity (Centroid) Search");
        const optimizedResults = searchWithProximity(queryVector, 5, engine);
        console.timeEnd("Proximity (Centroid) Search");
    
        console.log("Exact Search Results:", exactResults);
        console.log("Proximity (Centroid) Search Results:", optimizedResults);
    });
});
