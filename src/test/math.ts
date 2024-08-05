import { addVector, checkApproachesZero, createEngine, DistanceMetricFn, getSeededRandomFn, MIN_DIMENSIONS, normalizeVector, Vectors, VectorSearchEngine } from "../store_ivf_pq";
import { Means } from "../store_ivf_pq.test";
import { svd, dotMM, diag } from "../lib/svd"

export const reduceDimensionalitySVD = (data: Array<Float32Array>, targetDim: number): Array<Float32Array> => {
  const matrix = data.map(row => Array.from(row));
  const { U, S /*, V*/ } = svd(matrix);

  // Select the top `targetDim` components
  const truncatedS = S.slice(0, targetDim);
  const truncatedU = U.map(row => row.slice(0, targetDim));
  //const truncatedV = V.slice(0, targetDim).map(row => row.slice(0, targetDim));

  // Reconstruct the reduced dimensionality data
  const reducedData = dotMM(truncatedU, diag(truncatedS));

  // Convert the result back to an array of Float32Array
  return reducedData.map(row => Float32Array.from(row));
};

export const optimizeDimensionality = (data: Array<Float32Array>): number => {
  let currentDim = data[0].length;
  let optimalDim = currentDim;
  let warnings = true;

  while (warnings && currentDim > 1) {
      // Reduce dimensionality
      const reducedData = reduceDimensionalitySVD(data, currentDim);

      // Create engine and add vectors
      const engine = createEngine({ dimensionality: reducedData[0].length, numClusters: 1, normalize: true });
      reducedData.forEach((vector, index) => addVector(`vector_${index}`, vector, engine));

      // Validate vectors
      const validationResult = checkApproachesZero(engine);
      warnings = validationResult !== undefined;

      // Update optimal dimension if no warnings
      if (!warnings) {
          optimalDim = currentDim;
      }

      // Reduce dimensionality for the next iteration
      currentDim--;
  }

  return optimalDim;
};


/**
 * Pads an array of Float32Arrays to the specified dimensionality
 * @param vectors - An array of Float32Arrays with varying lengths
 * @param dimensionality - The desired length for all vectors
 * @returns An array of Float32Arrays with the specified length
 */
export function padVector(vector: Float32Array, dimensionality: number): Float32Array {
  if (dimensionality === vector.length) {
      return vector;
  }
  const paddedVector = new Float32Array(dimensionality);
  paddedVector.set(vector, 0);
  return paddedVector;
}

/**
 * Initialize centroids randomly from the input vectors.
 * @param vectors - The list of vectors to choose from.
 * @param k - The number of centroids to initialize.
 * @param seed - Seed for random number generation.
 * @returns An array of centroids.
 */
export function initializeCentroidsRandomly(vectors: Vectors, k: number, seed?: number): Vectors {
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
export function kMeans(vectors: Vectors, k: number, metric: DistanceMetricFn, initialCentroids: Vectors = [], maxIterations = 100): Means {
  if (vectors[0].length < MIN_DIMENSIONS) {
      throw new Error(`Vectors must have a minimum dimensionality of ${MIN_DIMENSIONS}`);
  }

  const dimension = vectors[0].length;
  const centroids = initialCentroids.length === k ? initialCentroids : initializeCentroidsRandomly(vectors, k);
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
          let bestDistance = -metric(vectors[i], centroids[0]); // Minimize metric for distance
          for (let j = 1; j < k; j++) {
              const distance = -metric(vectors[i], centroids[j]); // Minimize metric for distance
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

// Calculate within-cluster sum of squares (WCSS) for a given clustering result
export const calculateWCSS = (vectors: Vectors, centroids: Vectors, assignments: Uint32Array, engine: VectorSearchEngine): number => {
  let wcss = 0;
  for (let i = 0; i < vectors.length; i++) {
      const clusterIdx = assignments[i];
      const vector = vectors[i];
      const centroid = centroids[clusterIdx];
      const distance = engine.getDistance(normalizeVector(vector), normalizeVector(centroid));
      wcss += distance * distance;
  }
  return wcss;
};

/**
 * Scales a given value with an exponent e-1 to e-1 (* (1 + e41)) proportional to the exponent value.
 * @param value - The value to be scaled.
 * @returns The scaled value.
 */
export const scaleValueToExponent = (value: number): number => {
  // Get the exponent of the value
  const exponent = Math.floor(Math.log10(Math.abs(value)));

  // If exponent is e-1, then we scale it accordingly
  if (exponent < 0) {
      const scaleFactor = 1 + Math.pow(10, -exponent);
      return value * scaleFactor;
  }

  // If the value does not have e-1 exponent, return it unchanged
  return value;
}
