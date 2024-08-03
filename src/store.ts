export interface Vector {
  key: string;
  values: Float32Array;
}

interface VectorSearchEngine {
  index: Map<string, Float32Array>;
  dimension: number;
}

const DIMENSION = 128;
const engine: VectorSearchEngine = {
  index: new Map<string, Float32Array>(),
  dimension: DIMENSION
};

// add a vector to the index
export function addVector(key: string, vector: Float32Array): void {
  if (vector.length !== engine.dimension) {
      throw new Error(`Vector must be of dimension ${engine.dimension}`);
  }
  engine.index.set(key, vector);
}

// remove a vector from the index
export function removeVector(key: string): void {
  engine.index.delete(key);
}

// search for the top-k closest vectors using dot product
export function search(vector: Float32Array, topK: number): Array<{ key: string; similarity: number }> {
  if (vector.length !== engine.dimension) {
      throw new Error(`Query vector must be of dimension ${engine.dimension}`);
  }

  const results: Array<{ key: string; similarity: number }> = [];
  const dotProduct = createDotProductFunction(engine.dimension);

  for (const [key, indexedVector] of engine.index.entries()) {
      const similarity = dotProduct(vector, indexedVector);
      results.push({ key, similarity });
  }

  return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
}

// cluster vectors using k-means clustering
export function cluster(k: number): Array<{ centroid: Float32Array; members: Array<string> }> {
  if (k <= 0 || k > engine.index.size) {
      throw new Error('Invalid number of clusters');
  }

  const keys = Array.from(engine.index.keys());
  const centroids: Array<Float32Array> = [];
  for (let i = 0; i < k; i++) {
      centroids.push(engine.index.get(keys[Math.floor(Math.random() * keys.length)])!.slice());
  }

  let changed = true;
  const clusters: Array<{ centroid: Float32Array; members: Array<string> }> = [];
  const dotProduct = createDotProductFunction(engine.dimension);
  const arraysEqual = createArraysEqualFunction(engine.dimension);

  while (changed) {
      changed = false;
      clusters.length = 0;
      for (let i = 0; i < k; i++) {
          clusters.push({ centroid: centroids[i], members: [] });
      }

      // assign vectors to the nearest centroid
      for (const [key, vector] of engine.index.entries()) {
          let bestIndex = 0;
          let bestDistance = dotProduct(vector, centroids[0]);

          for (let i = 1; i < k; i++) {
              const distance = dotProduct(vector, centroids[i]);
              if (distance > bestDistance) {
                  bestIndex = i;
                  bestDistance = distance;
              }
          }

          clusters[bestIndex].members.push(key);
      }

      // update centroids
      for (let i = 0; i < k; i++) {
          const cluster = clusters[i];
          const newCentroid = new Float32Array(engine.dimension);
          for (const key of cluster.members) {
              const vector = engine.index.get(key)!;
              for (let j = 0; j < engine.dimension; j++) {
                  newCentroid[j] += vector[j];
              }
          }
          for (let j = 0; j < engine.dimension; j++) {
              newCentroid[j] /= cluster.members.length;
          }

          if (!arraysEqual(newCentroid, centroids[i])) {
              centroids[i] = newCentroid;
              changed = true;
          }
      }
  }

  return clusters;
}

// create a dot product function optimized for a given dimension
function createDotProductFunction(dimension: number) {
  return function dotProduct(a: Float32Array, b: Float32Array): number {
      let sum = 0;
      for (let i = 0; i < dimension; i++) {
          sum += a[i] * b[i];
      }
      return sum;
  };
}

// create an arrays equal function optimized for a given dimension
function createArraysEqualFunction(dimension: number) {
  return function arraysEqual(a: Float32Array, b: Float32Array): boolean {
      for (let i = 0; i < dimension; i++) {
          if (a[i] !== b[i]) return false;
      }
      return true;
  };
}