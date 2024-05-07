import { benchmarked } from "../src/test/benchmarked";
import { createDocument, search, type Document, init, createQueryDocument } from "../src/vector";

console.log("Loading model...");
await init();
console.log("Model loaded.");

console.log("Starting demo...");
await benchmarked(
  async () => {

    let englishText = "Exploring the depths of the ocean reveals a world beyond imagination."
    let germanText = "Die Erforschung der Tiefen des Ozeans offenbart eine Welt jenseits der Vorstellungskraft."
    let frenchText = "L'exploration des profondeurs de l'océan révèle un monde au-delà de l'imagination."
    let chineseText = "探索海洋的深处揭示了一个超乎想象的世界。"
    let spanishText = "La exploración de las profundidades del océano revela un mundo más allá de la imaginación."

    // This text corpus is a collection of documents in different languages, each describing the ocean.
    // They share the meaning, but the words and even the symbols used to describe it are different.
    // However, using vector embeddings, we can compare the documents and find similarities,
    // which allows for cross-lingual search - a search that is made for humans, not machines.
    // This quality is, for an open-source model, a major breakthrough.
    // Combined with vector embedding search, everyone has access to local, powerful text search now.
    // And the best news: It's fast, it's available, it's possible, now, and for free!
    const myDocuments = [
      {
        text: englishText,
        metaData: { id: 1, language: "English", text: englishText },
      },
      {
        text: spanishText,
        metaData: { id: 2, language: "Spanish", text: spanishText },
      },
      {
        text: chineseText,
        metaData: { id: 3, language: "Chinese", text: chineseText },
      },
      {
        text: frenchText,
        metaData: { id: 4, language: "French", text: frenchText },
      },
      {
        text: germanText,
        metaData: { id: 5, language: "German", text: germanText },
      },
    ];

    console.log("Text corpus:", myDocuments);

    const haystack: Array<Document> = [];

    // vectorization (text to embeddings)
    for (const doc of myDocuments) {
      haystack.push(await createDocument(doc.text, doc.metaData));
    }

    // vecotrization of the search string (which doesn't share much text similarity, BUT MEANING)
    const needle = await createQueryDocument(
      "Unveiling the mysteries beneath the sea",
    );

    console.log("Searching for:", "Unveiling the mysteries beneath the sea");

    // running cosine similarity search in vector space
    const searchResults = await search(haystack, needle);

    // displaying search results
    console.log(
      searchResults.map((result) => ({
        score: result.score,
        id: result.doc.metadata.id,
        language: result.doc.metadata.language, // include language in the result for better context
        text: result.doc.metadata.text,
      })),
    );

    /** Prints something like this:
     * Searching for: Unveiling the mysteries beneath the sea
      [
        { score: 0.6855015563968822, id: 1, language: 'English' },
        { score: 0.5687096727474149, id: 4, language: 'French' },
        { score: 0.5426440067625005, id: 2, language: 'Spanish' },
        { score: 0.4697886145316811, id: 3, language: 'Chinese' },
        { score: 0.34714563173592217, id: 5, language: 'German' }
      ]
      benchmarked: elapsed secs 0.292
      benchmarked: total memory usage was: 1073.42 MiB
     */


    const needleInvalidation = await createQueryDocument(
      "Fritzchen geht mit Hans nach Hause",
    );

    console.log("Searching for:", "Fritzchen geht mit Hans nach Hause",);

    // running cosine similarity search in vector space
    const searchResults2 = await search(haystack, needleInvalidation);

    // displaying search results
    console.log(
      searchResults2.map((result) => ({
        score: result.score,
        id: result.doc.metadata.id,
        language: result.doc.metadata.language, // include language in the result for better context
        text: result.doc.metadata.text,
      })),
    );

    return searchResults;
  },
  async () => {},
)();
