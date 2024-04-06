import { benchmarked } from "../src/test/benchmarked";
import { createDocument, search, type Document, init } from "../src/vector";

console.log("Loading model...");
await init();
console.log("Model loaded.");

console.log("Starting demo...");
await benchmarked(
  async () => {
    // this text corpus is a collection of documents in different languages, each describing the ocean
    // they share the meaning, but the words and even the symbols used to describe it are different
    // however, using vector embeddings, we can compare the documents and find similarities
    // which allows for cross-lingual search and translation
    // for an open-source model, this is a major breakthrough
    // from now on, everyone has access to powerful text search - for free
    const myDocuments = [
      {
        text: "Exploring the depths of the ocean reveals a world beyond imagination.",
        metaData: { id: 1, language: "English" },
      },
      {
        text: "La exploración de las profundidades del océano revela un mundo más allá de la imaginación.",
        metaData: { id: 2, language: "Spanish" },
      },
      {
        text: "探索海洋的深处揭示了一个超乎想象的世界。",
        metaData: { id: 3, language: "Chinese" },
      },
      {
        text: "L'exploration des profondeurs de l'océan révèle un monde au-delà de l'imagination.",
        metaData: { id: 4, language: "French" },
      },
      {
        text: "Die Erforschung der Tiefen des Ozeans offenbart eine Welt jenseits der Vorstellungskraft.",
        metaData: { id: 5, language: "German" },
      },
    ];

    console.log("Text corpus:", myDocuments);

    const haystack: Array<Document> = [];

    // vectorization (text to embeddings)
    for (const doc of myDocuments) {
      haystack.push(await createDocument(doc.text, doc.metaData));
    }

    // vecotrization of the search string (which doesn't share much text similarity, BUT MEANING)
    const needle = await createDocument(
      "Unveiling the mysteries beneath the sea",
    );

    console.log("Searching for:", "Unveiling the mysteries beneath the sea");

    // running cosine similarity search in vector space
    const searchResults = search(haystack, needle);

    // Displaying search results
    console.log(
      searchResults.map((result) => ({
        score: result.score,
        id: result.doc.metadata.id,
        language: result.doc.metadata.language, // include language in the result for better context
      })),
    );

    return searchResults;
  },
  async () => {},
)();
