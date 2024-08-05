import { embed } from "cross-llm"
import dotenv from 'dotenv'
import { readFileSync, writeFileSync } from "fs"

dotenv.config()

export enum EmbeddingLang {
  DE = 0,
  EN = 1
}

export type Embedding = {
  key: EmbeddingLang,
  word: string,
  vector: Array<number>
}

export type Embeddings = Array<Embedding>


export const readEmbedCacheFile = (iso2Code: string, dimensionality = 4): Embeddings => {
  try {
    const raw = readFileSync(`data/${iso2Code}_embed_cache_${dimensionality}d.json`, 'utf-8')
    return JSON.parse(raw)
  } catch(e) {
    return []
  }
}

export const writeEmbedCacheFile = (iso2Code: string, data: Embeddings, dimensionality = 4) => {
  writeFileSync(`data/${iso2Code}_embed_cache_${dimensionality}d.json`, JSON.stringify(data, null, 2))
}

export const getTestEmbedding = async(word: string, dimensionality = 4) => {

  const cache = readEmbedCacheFile('unknown', dimensionality)

  const cacheEntry = cache.find(e => e.word === word)
  if (cacheEntry) {
    return cacheEntry.vector
  }

  const embedding = await embed([word], "mixedbread-ai", {
    normalized: true,
    dimensions: dimensionality,
    model: "mixedbread-ai/deepset-mxbai-embed-de-large-v1",
  }, {
    apiKey: process.env["mixedbread-ai_api_key"]
  })

  const vector = Array.from(embedding.data[0].embedding)

  cache.push({
    word,
    key: EmbeddingLang.DE,
    vector: Array.from(vector)
  })

  writeEmbedCacheFile('unknown', cache, dimensionality)

  return vector
}
