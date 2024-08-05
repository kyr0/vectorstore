import { readFileSync } from "fs"
import { EmbeddingLang, getTestEmbedding, readEmbedCacheFile, writeEmbedCacheFile } from "../src/test/embed"

const dimensionality = 4

const languageNameToIso2CodeMap = {
  "deu": "de",
  "eng": "en"
}

const languagesToProcess = ['deu', 'eng']

for (const langName of languagesToProcess) {
  const iso2Code = languageNameToIso2CodeMap[langName]
  const embeddings = readEmbedCacheFile(iso2Code)
  const wordsToEmbed = JSON.parse(readFileSync(`data/languageWordDiscriminators.json`, 'utf-8'))[langName] as Array<string>

  let i=0; 
  for (const word of wordsToEmbed) {

    if (embeddings.find(e => e.word === word)) {
      continue;
    }

    const vector = await getTestEmbedding(word, dimensionality)

    embeddings.push({
      word,
      key: iso2Code === "de" ? EmbeddingLang.DE : EmbeddingLang.EN,
      vector: Array.from(vector)
    })
    writeEmbedCacheFile(iso2Code, embeddings)
    i++;

    if (i===10) {
      console.log('done, breaking after', i)
      break;
    }
  }
}
