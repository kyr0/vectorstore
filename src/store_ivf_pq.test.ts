import { describe, it, expect } from 'vitest';
import { addVector, removeVector, search, Vector, MIN_DIMENSIONS, normalizeVector, updateIndex, initializeCentroidsWithVectors, createEngine, Vectors, getSeededRandomFn, searchWithProximity, DistanceMetricFn, VectorSearchEngine, serialize, deserialize, serializeToString, deserializeFromString, checkApproachesZero } from './store_ivf_pq';
import { MemoryUsageTracker } from './test/memory-tracker';
import { singleDotProductWasm } from 'fast-dotproduct';
import { calculateWCSS, initializeCentroidsRandomly, kMeans } from './test/math';
import { getTokenizer, isValidTerm, removeSpecialCharsPerTokenizer, vectorizeWord, vectorizeWordlists } from './test/wordlist';
import { readFileSync, writeFileSync } from 'fs';
import { Embeddings, getTestEmbedding } from './test/embed';

export interface Means {
    centroids: Vectors;
    assignments: Uint32Array;
}

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

    it('should add vectors, search, and find correct scores', () => {
        const engine = createEngine({ normalize: true });
        const vector1: Vector = new Float32Array(engine.dimensionality).map((_, i) => i % 2 === 0 ? 1 : -1); // Alternating pattern
        const vector2: Vector = new Float32Array(engine.dimensionality).map((_, i) => (i % 3 === 0 ? 2 : 0.5)); // Different pattern

        addVector('vec1', vector1, engine);
        addVector('vec2', vector2, engine);

        const results1 = search(vector1, 2, engine);
        expect(results1.length).toBe(2);
        expect(results1[0].key).toBe('vec1');
        expect(results1[0].similarity).toBeGreaterThanOrEqual(results1[1].similarity);

        const results2 = search(vector2, 2, engine);
        expect(results2.length).toBe(2);
        expect(results2[0].key).toBe('vec2');
        expect(results2[0].similarity).toBeGreaterThanOrEqual(results2[1].similarity);
    });

    it('should remove vectors, search, and ensure vectors are not found, centroids updated correctly', () => {
        const engine = createEngine({ normalize: true });
        const vector1: Vector = new Float32Array(engine.dimensionality).map((_, i) => i % 2 === 0 ? 1 : -1); // Alternating pattern
        const vector2: Vector = new Float32Array(engine.dimensionality).map((_, i) => (i % 3 === 0 ? 2 : 0.5)); // Different pattern

        addVector('vec1', vector1, engine);
        addVector('vec2', vector2, engine);

        removeVector('vec1', engine);

        const results1 = search(vector1, 2, engine);
        expect(results1.find(result => result.key === 'vec1')).toBeUndefined();

        const results2 = search(vector2, 2, engine);
        expect(results2.length).toBe(1); // Only one vector should remain
        expect(results2[0].key).toBe('vec2');
    });

    it('should add vectors again, search, and find correct scores again', () => {
        const engine = createEngine({ normalize: true });
        const vector1: Vector = new Float32Array(engine.dimensionality).map((_, i) => i % 2 === 0 ? 1 : -1); // Alternating pattern
        const vector2: Vector = new Float32Array(engine.dimensionality).map((_, i) => (i % 3 === 0 ? 2 : 0.5)); // Different pattern
        const vector3: Vector = new Float32Array(engine.dimensionality).map((_, i) => (i % 5 === 0 ? 3 : 0.75)); // Different pattern

        addVector('vec1', vector1, engine);
        addVector('vec2', vector2, engine);

        removeVector('vec1', engine);

        addVector('vec1', vector1, engine);
        addVector('vec3', vector3, engine);

        const results1 = search(vector1, 3, engine);
        expect(results1.length).toBe(3);
        expect(results1[0].key).toBe('vec1');
        expect(results1[0].similarity).toBeGreaterThanOrEqual(results1[1].similarity);

        const results2 = search(vector2, 3, engine);
        expect(results2.length).toBe(3);
        expect(results2[0].key).toBe('vec2');
        expect(results2[0].similarity).toBeGreaterThanOrEqual(results2[1].similarity);

        const results3 = search(vector3, 3, engine);
        expect(results3.length).toBe(3);
        expect(results3[0].key).toBe('vec3');
        expect(results3[0].similarity).toBeGreaterThanOrEqual(results3[1].similarity);
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
        const length = Math.sqrt(singleDotProductWasm(normalized, normalized));

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
        const randomCentroids = initializeCentroidsRandomly(vectors, 2);
        console.log("Randomly Initialized Centroids:", randomCentroids);

        // Perform k-means clustering with random centroids
        const randomKMeansResult = kMeans(vectors, 2, engine.getDistance, randomCentroids);
        console.log("KMeans with Random Centroids:", randomKMeansResult);

        // Initialize centroids using k-means++
        const kMeansPlusPlusCentroids = initializeCentroidsWithVectors(vectors, 2, engine.getDistance);
        console.log("KMeans++ Initialized Centroids:", kMeansPlusPlusCentroids);

        // Perform k-means clustering with k-means++ centroids
        const kMeansPlusPlusResult = kMeans(vectors, 2, engine.getDistance, kMeansPlusPlusCentroids);
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
        updateIndex(engine);
    
        // Perform k-means clustering with random centroids
        const randomCentroids = initializeCentroidsRandomly(allVectors, 2);
        const randomKMeansResult = kMeans(allVectors, 2, engine.getDistance, randomCentroids, 100);
    
        // Perform k-means clustering with k-means++ centroids
        const kMeansPlusPlusCentroids = initializeCentroidsWithVectors(allVectors, 2, engine.getDistance);
        const kMeansPlusPlusResult = kMeans(allVectors, 2, engine.getDistance, kMeansPlusPlusCentroids, 100);
    
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
    
    
        console.time("Adding Vectors");
        // Add vectors to the engine
        cluster1Vectors.forEach((vector, index) => addVector(`cluster1_${index}`, vector, engine));
        cluster2Vectors.forEach((vector, index) => addVector(`cluster2_${index}`, vector, engine));
        console.timeEnd("Adding Vectors");
    
        // Update centroids
        updateIndex(engine);
    
        const tracker = new MemoryUsageTracker();
        tracker.startTracking();

        // Query vector close to cluster 2
        const queryVector = new Float32Array(1024).map(() => random() * 10 + 100);
    
        console.time("Proximity (Centroid) Search");
        const optimizedResults = searchWithProximity(queryVector, 5, engine);
        console.timeEnd("Proximity (Centroid) Search");
    
        const { averageMemory } = tracker.stopTracking();
        console.log("benchmarked: total memory usage was:", averageMemory, "MiB");

        // Perform search
        console.time("Exact Search");
        const exactResults = search(queryVector, 5, engine);
        console.timeEnd("Exact Search");

        console.log("Exact Search Results:", exactResults);
        console.log("Proximity (Centroid) Search Results:", optimizedResults);
    });

    it('should correctly serialize and deserialize a VectorSearchEngine instance', async () => {
       // Create a vector search engine instance
       const engine: VectorSearchEngine = createEngine({ dimensionality: 4, numClusters: 2 });

       // Add some vectors to the engine
       const vector1: Vector = new Float32Array([0.1, 0.2, 0.3, 0.4]);
       const vector2: Vector = new Float32Array([0.5, 0.6, 0.7, 0.8]);
       addVector('vec1', vector1, engine);
       addVector('vec2', vector2, engine);

       updateIndex(engine);

       // Perform a search before serialization
       let results = search(vector1, 2, engine);
       expect(results.length).toBe(2);
       expect(results[0].key).toBe('vec1');

       // Serialize the engine (can be stored in a database, e.g. dexie now / indexeddb)
       const serializedEngine = serialize(engine);

       // Encode the serialized engine to a string (can be saved to disk/file, e.g. localStorage as a string now)
       const encodedEngine = serializeToString(serializedEngine);

       // Decode the encoded string back to a serialized engine (decoded from string back to structured serialization)
       const decodedSerializedEngine = deserializeFromString(encodedEngine);

       // Deserialize the engine (recreated engine object from structured serialization)
       const deserializedEngine = await deserialize(decodedSerializedEngine);

       // Check that the deserialized engine matches the original engine
       expect(deserializedEngine.dimensionality).toBe(engine.dimensionality);
       expect(deserializedEngine.numClusters).toBe(engine.numClusters);
       expect(deserializedEngine.normalize).toBe(engine.normalize);
       expect(deserializedEngine.distanceMetric).toBe(engine.distanceMetric);
       expect(deserializedEngine.seed).toBe(engine.seed);

       // Check clusters
       expect(deserializedEngine.clusters.length).toBe(engine.clusters.length);
       for (let i = 0; i < engine.clusters.length; i++) {
           const originalCluster = engine.clusters[i];
           const deserializedCluster = deserializedEngine.clusters[i];
           expect(originalCluster.centroid.length).toBe(deserializedCluster.centroid.length);
           for (let j = 0; j < originalCluster.centroid.length; j++) {
               expect(originalCluster.centroid[j]).toBeCloseTo(deserializedCluster.centroid[j]);
           }
           expect(Array.from(originalCluster.vectors.keys())).toEqual(Array.from(deserializedCluster.vectors.keys()));
       }

       // Check index
       expect(Array.from(engine.index.keys())).toEqual(Array.from(deserializedEngine.index.keys()));
       for (const [key, vector] of engine.index.entries()) {
           const deserializedVector = deserializedEngine.index.get(key);
           expect(deserializedVector).not.toBeUndefined();
           if (deserializedVector) {
               expect(vector.length).toBe(deserializedVector.length);
               for (let i = 0; i < vector.length; i++) {
                   expect(vector[i]).toBeCloseTo(deserializedVector[i]);
               }
           }
       }

       // Check centroids
       expect(engine.centroids.length).toBe(deserializedEngine.centroids.length);
       for (let i = 0; i < engine.centroids.length; i++) {
           expect(engine.centroids[i].length).toBe(deserializedEngine.centroids[i].length);
           for (let j = 0; j < engine.centroids[i].length; j++) {
               expect(engine.centroids[i][j]).toBeCloseTo(deserializedEngine.centroids[i][j]);
           }
       }

       // Perform a search after deserialization
       results = search(vector1, 2, deserializedEngine);
       expect(results.length).toBe(2);
       expect(results[0].key).toBe('vec1');

       // Additional search test with proximity
       const queryVector = new Float32Array(4).map(() => Math.random() * 10 + 0.5);
       const optimizedResults = searchWithProximity(queryVector, 2, deserializedEngine);
       expect(optimizedResults.length).toBe(2);
    });

    it("can cluster tokenized wordlists in a dense vector space", async() => {

        const tokenizer = getTokenizer();

        const vectorizedWordlists = vectorizeWordlists('data/languageWordDiscriminators.json');
        const storePerLanguage: {
            [isoLangCode: string]: VectorSearchEngine
        } = {}


        const l = []

        for (const iso2LangCode of Object.keys(vectorizedWordlists)) {
            const vectorizedWordList = vectorizedWordlists[iso2LangCode]
            const firstWordVector = vectorizedWordList[0].vector // as all vectors share the same dimensionality property, the first is enough

            //const v = vectorizedWordList.map(d => d.vector)
            //const rv = reduceDimensionalitySVD(v, 4)
            console.log("langCode", iso2LangCode, "firstWordVector", firstWordVector)

            if (typeof firstWordVector === "undefined") {
                throw new Error("No vector in wordlist for language: " + iso2LangCode)
            }
                
            // Create a vector search engine instance with the dimensionality of the language
            const engine: VectorSearchEngine = createEngine({ 
                dimensionality: 4, 
                numClusters: 1 /** one centroid cluster */, 
                normalize: true 
            });
            
            for (let i = 0; i<vectorizedWordList.length; i++) {
                l.push(vectorizedWordList[i].vector)
                addVector(vectorizedWordList[i].word, vectorizedWordList[i].vector, engine);
            }
            updateIndex(engine); // optimize centroid
            storePerLanguage[iso2LangCode] = engine;
            const nzcount = checkApproachesZero(engine) // check against close-to-zero similarity 

            console.log("nzcount", nzcount, "iso2LangCode", iso2LangCode)

            writeFileSync(`data/${iso2LangCode}_test_store_index_tokenized_words.json`, JSON.stringify(l, null, 2))
        }

        const searchTexts = ["Hallo, Welt", "Hello, world", "Привет, мир! Как у тебя дела?"]
        const resultsTopP = []
        for (const searchText of searchTexts) {

            let searchVectors: {
                [isoLangCode: string]: Array<Float32Array>;
            } = {}

            const topP = {}
            for (const iso2LangCode of Object.keys(storePerLanguage)) {

                const engine = storePerLanguage[iso2LangCode];
                if (typeof searchVectors[iso2LangCode] === "undefined") {

                    const searchTerms = removeSpecialCharsPerTokenizer(searchText, iso2LangCode).toLowerCase().split(" ").filter(isValidTerm)

                    console.log("searchTerms", searchTerms)

                    searchVectors[iso2LangCode] = searchTerms.map(word => vectorizeWord(word, {
                        tokenizer,
                        dimensionality: 4,
                        normalize: true,
                        pad: false,
                        pack: true
                    }))
                }
        
                let avgScore = 0;
                for (let i=0; i<searchVectors[iso2LangCode].length; i++) {
                    const result = searchWithProximity(searchVectors[iso2LangCode][i], 5, engine)
                    const score = result[0].similarity
                    avgScore += score;
                    console.log("searchResult", iso2LangCode, "vector", searchVectors[iso2LangCode][i], "score", score, "result", result)
                }
                topP[iso2LangCode] = avgScore / searchVectors[iso2LangCode].length;
            }
            resultsTopP.push({
                searchText,
                topP,
            })
        }
        console.log("storePerLanguage", resultsTopP)
    })

    it("can cluster embedded words in a dense vector space", async() => {

        const isoLangs = ["de", "en"]
        const storePerLanguage: {
            [isoLangCode: string]: VectorSearchEngine
        } = {}


        const indexData = []

        const embeddingsPerLanguage: {
            [isoLangCode: string]: Embeddings
        } = {}

        for (const iso2LangCode of isoLangs) {
            const embeddings: Embeddings = JSON.parse(readFileSync(`data/${iso2LangCode}_embed_cache_4d.json`, 'utf-8'))
            embeddingsPerLanguage[iso2LangCode] = embeddings
            const firstWordVector = embeddings[0].vector // as all vectors share the same dimensionality property, the first is enough

            console.log("langCode", iso2LangCode, "firstWordVector", firstWordVector)

            if (typeof firstWordVector === "undefined") {
                throw new Error("No vector in wordlist for language: " + iso2LangCode)
            }
                
            // Create a vector search engine instance with the dimensionality of the language
            const engine: VectorSearchEngine = createEngine({ 
                dimensionality: 4, 
                numClusters: 1 /** one centroid cluster */, 
                normalize: true 
            });
            
            for (let i = 0; i<embeddings.length; i++) {
                indexData.push(embeddings[i].vector)
                addVector(embeddings[i].word, new Float32Array(embeddings[i].vector), engine);
            }
            updateIndex(engine); // optimize centroid
            storePerLanguage[iso2LangCode] = engine;
            const nzcount = checkApproachesZero(engine) // check against close-to-zero similarity 

            console.log("nzcount", nzcount, "iso2LangCode", iso2LangCode)

            writeFileSync(`data/${iso2LangCode}_test_store_index_emebddings.json`, JSON.stringify(indexData, null, 2))
        }

        const searchTexts = ["with", "mit", "für", "for"]
        const resultsTopP = []
        const searchTermEmbeddings: {
            [word: string]: Float32Array
        } = {}

        for (const searchText of searchTexts) {

            let searchVectors: {
                [isoLangCode: string]: Array<Float32Array>;
            } = {}

            const topP = {}

            for (const iso2LangCode of Object.keys(storePerLanguage)) {

                const embeddingFound = embeddingsPerLanguage[iso2LangCode].find(e => e.word === searchText);

                if (embeddingFound) {
                    searchTermEmbeddings[searchText] = new Float32Array(embeddingFound.vector)
                } 
            }

            if (! searchTermEmbeddings[searchText]) {
                console.log("searchText", searchText, "not found in embeddings")

                const vector = await getTestEmbedding(searchText, 4)

                if (vector) {
                    searchTermEmbeddings[searchText] = new Float32Array(vector)
                } else {
                    throw new Error("No embedding found for word: " + searchText)
                }
            }

            for (const iso2LangCode of Object.keys(storePerLanguage)) {

                const engine = storePerLanguage[iso2LangCode];
                if (typeof searchVectors[iso2LangCode] === "undefined") {
                    searchVectors[iso2LangCode] = []
                }

                if ( searchTermEmbeddings[searchText]) {
                    searchVectors[iso2LangCode].push(searchTermEmbeddings[searchText])
                }
        
                let avgScore = 0;
                for (let i=0; i<searchVectors[iso2LangCode].length; i++) {
                    const result = searchWithProximity(searchVectors[iso2LangCode][i], 1, engine)
                    const score = result[0].similarity
                    avgScore += score;
                    console.log("searchResult embeddings", iso2LangCode, "vector", searchVectors[iso2LangCode][i], "score", score, "result", result)
                }
                topP[iso2LangCode] = avgScore / searchVectors[iso2LangCode].length;
            }
            resultsTopP.push({
                searchText,
                topP,
            })
        }
        console.log("storePerLanguageEmbeddings", resultsTopP)
    })
});
