import { benchmarked } from "../src/test/benchmarked";
import { createMockDocument } from "../src/test/mock";
import {
  dotProduct,
  magnitude,
  cosineSimilarity,
  type Document,
  createDocument,
  search,
} from "../src/vector";

describe("Vector Operations", async () => {
  // real-world documents
  const exampleTexts = [
    "Goodbye world",
    "Hello universe",
    "Hello world",
    "hi, world",
    "Huhu, World",
    "Hello, Worlds",
  ];
  const queryText = "Good evening world";

  const documents: Document[] = [];
  for (let i = 0; i < exampleTexts.length; i++) {
    const text = exampleTexts[i];
    const metaData = { text: text };
    const document = await createDocument(text, metaData);
    documents.push(document);
  }

  const queryDocument = await createDocument(queryText, {
    text: queryText,
  });

  // mock documents
  const mockDocuments = [
    createMockDocument("Goodbye world"),
    createMockDocument("Hello universe"),
    createMockDocument("Hello world"),
  ];
  const mockQueryDocument = createMockDocument("Good evening world");

  it("dotProduct - should correctly compute the dot product of two tensors", () => {
    const tensor1 = mockDocuments[0].embeddings;
    const tensor2 = mockDocuments[1].embeddings;

    expect(() => dotProduct(tensor1, tensor2)).not.toThrow();

    const result = dotProduct(tensor1, tensor2);
    expect(result).toBeCloseTo(192, 10);
  });

  it("magnitude - should correctly compute the magnitude of a tensor", () => {
    const tensor = mockDocuments[0].embeddings;
    const mag = magnitude(tensor);
    expect(magnitude(tensor)).toBeCloseTo(13.856406460551018, 10);
  });

  it("similarity - should correctly compute the cosine similarity of two documents", () => {
    const sim = cosineSimilarity(mockDocuments[0], mockQueryDocument);
    // the second argument (10) is the number of decimal places to consider
    expect(sim).toBeCloseTo(1, 10);
  });

  it("createDocument - should correctly create a document from text and metadata", async () => {
    documents.forEach((doc) => {
      expect(doc.embeddings.dims[0]).toEqual(768);
      expect(doc.embeddings.size).toEqual(768);
    });

    expect(documents[0].metadata.text).toBe("Goodbye world");
    expect(documents[1].metadata.text).toBe("Hello universe");
    expect(documents[2].metadata.text).toBe("Hello world");

    expect(queryDocument.embeddings.dims[0]).toEqual(768);
    expect(queryDocument.embeddings.size).toEqual(768);
    expect(queryDocument.metadata.text).toBe(queryText);
  });

  it(
    "sortSimilar - should correctly sort documents based on similarity to a query document",
    benchmarked(
      async () => search(documents, queryDocument),
      (searchResults) => {
        expect(searchResults).toBeInstanceOf(Array);
        expect(searchResults.length).toBe(documents.length);

        const expectedMostSimilar = documents.find(
          (doc) => doc.metadata.text === "Hello world",
        );
        expect(searchResults[0].doc).toEqual(expectedMostSimilar);

        for (const searchResult of searchResults) {
          // ensure reproducibility
          const currentSimilarity = cosineSimilarity(
            searchResult.doc,
            queryDocument,
          );
          expect(currentSimilarity).toBeLessThanOrEqual(searchResult.score);
        }

        console.log("Searching for 'Hello world' in exampleTexts (haystack):");
        console.log(exampleTexts);

        console.log(
          "Result:",
          searchResults.map((searchResult) => ({
            text: searchResult.doc.metadata.text,
            score: searchResult.score,
          })),
        );
      },
    ),
  );

  it(
    "sortSimilar - should correctly sort documents based on similarity to a query document - multilang",
    benchmarked(
      async () => search(documents, await createDocument("Hallo, Welt", {})),
      (searchResults) => {
        expect(searchResults).toBeInstanceOf(Array);
        expect(searchResults.length).toBe(documents.length);

        const expectedMostSimilar = documents.find(
          (doc) => doc.metadata.text === "Huhu, World", // "Huhu" is informal german and "Hallo" is informal german too for "Hello"
        );
        expect(searchResults[0].doc).toEqual(expectedMostSimilar);

        console.log("Searching for 'Hallo, Welt' in exampleTexts (haystack):");
        console.log(exampleTexts);

        console.log(
          "Result:",
          searchResults.map((searchResult) => ({
            text: searchResult.doc.metadata.text,
            score: searchResult.score,
          })),
        );
      },
    ),
  );
});
