<h1 align="center">vectorstore</h1>

> Pure JavaScript implementation of a vector store with similarity search. Runs locally, in Node/Bun/Deno or even in your browser. Supports various embedding models. Open-source and free, no-cost.

<h2 align="center">Features</h2>

- ✅ Does X and Y
- ✅ Available as a simple API and simple to use CLI
- ✅ Just `136 byte` nano sized (ESM, gizpped)
- ✅ Tree-shakable and side-effect free
- ✅ Runs on Windows, Mac, Linux, CI tested
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage

<h2 align="center">The Science</h2>

If you came here to understand the math behind the scenes,
please head on to: https://towardsdatascience.com/text-embeddings-comprehensive-guide-afd97fce8fb5
where Mariya Mansurova wrote an excellent article on Text Embeddings.

Now let's dive deeper into metrics and open-source models:
https://towardsdatascience.com/openai-vs-open-source-multilingual-embedding-models-e5ccb7c90f05

This is why I decided to use `nomic-embed-text-v1`. (Nomic-Embed): The model was designed by Nomic, and claims better performances than OpenAI Ada-002 and text-embedding-3-small while being only 0.55GB in size. Interestingly, the model is the first to be fully reproducible and auditable (open data and open-source training code).

https://huggingface.co/nomic-ai/nomic-embed-text-v1

<h2 align="center">Example usage (CLI)</h2>

`npx vectorstore-js vectorstore --foo X`

> You need at least version 18 of [Node.js](https://www.nodejs.org) installed.

<h2 align="center">Example usage (API, as a library)</h2>

<h3 align="center">Setup</h3>

- yarn: `yarn add @jsheaven/vectorstore`
- npm: `npm install @jsheaven/vectorstore`

<h3 align="center">ESM</h3>

```ts
import { vectorstore } from '@jsheaven/vectorstore'

const result = await vectorstore({
  foo: 'X',
})
```

<h3 align="center">CommonJS</h3>

```ts
const { vectorstore } = require('@jsheaven/vectorstore')

// same API like ESM variant
```
