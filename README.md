<h1 align="center">vectorstore</h1>

> Pure JavaScript implementation of a vector store with similarity search. Runs locally, in Node/Bun/Deno or even in your browser. Supports various embedding models. Open-source and free, no-cost.

<h2 align="center">Features</h2>

- ✅ Search for text similarities, locally, without API key, free of charge
- ✅ Best in class performance; better than OpenAI (see "The Science" section)
- ✅ Downloads the model automatically, caches it, executes offline afterwards
- ✅ Runs Node.js and (soon) in the browser (large download though ~500 MB)
- ✅ Uses the open-source `nomic-embed-text-v1` text embedding model, 8192 token context window
- ✅ Benchmarked: ~1 GiB memory usage at runtime
- ✅ Fast! Inference < 0.05 sec. on average (per document)
- ✅ Available as a simple API 
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ Well tested (soon to be... ;-)

<h2 align="center">The Science</h2>

If you came here to understand the math behind the scenes,
please head on to: https://towardsdatascience.com/text-embeddings-comprehensive-guide-afd97fce8fb5
where Mariya Mansurova wrote an excellent article on Text Embeddings.

Now let's dive deeper into metrics and open-source models:
https://towardsdatascience.com/openai-vs-open-source-multilingual-embedding-models-e5ccb7c90f05

This is why I decided to use `nomic-embed-text-v1`. (Nomic-Embed): The model was designed by Nomic, and claims better performances than OpenAI Ada-002 and text-embedding-3-small while being only 0.55GB in size. Interestingly, the model is the first to be fully reproducible and auditable (open data and open-source training code).

https://huggingface.co/nomic-ai/nomic-embed-text-v1

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add vectorstore`
- npm: `npm install vectorstore`

<h3 align="center">ESM</h3>

```ts
import { createDocument, search, type Document } from "vectorstore";

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

/** Prints:
 * [
  { score: 0.9999999999999999, id: 2 }, // "bar"
  { score: 0.3897944998952487, id: 1 }  // "foo"
]
 */
```

You can run this exact code as a demo when checking out this repository
using `git clone`, run `npm i` followed by `npm run demo`

<h3 align="center">CommonJS</h3>

```ts
const { createDocument, search } = require('vectorstore')

// same API like ESM variant
```
