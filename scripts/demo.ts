import { createDocument, search, type Document } from "../src/vector";

// your text haystack to search for similarities ("database", "store")
const myDocuments = [
  {
    text: "foo",
    metaData: {
      id: 1,
    },
  },
  {
    text: "bar",
    metaData: {
      id: 2,
    },
  },
];

// vectorized documents to search in
const haystack: Array<Document> = [];

// first we need to turn the document text into vector emebeddings
for (const doc of myDocuments) {
  haystack.push(await createDocument(doc.text, doc.metaData));
}

// put the search string here
const needle = await createDocument("bar");

// now we can search for similarities between searchDocument and the haystack
const searchResults = await search(haystack, needle);

// search results come sorted, with a .doc (Document) and a .score
// if you want to keep track of the original text,
// just add the original text to the metaData
console.log(
  searchResults.map((result) => ({
    score: result.score,
    id: result.doc.metadata.id,
  })),
);
