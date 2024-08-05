import { XLMRobertaTokenizer } from "@xenova/transformers";
import { readFileSync } from "node:fs";
import { padVector, scaleValueToExponent } from "./math";
import { normalizeVector } from "../store_ivf_pq";

export interface VectorizedWordLists {
  [isoLangCode: string]: Array<{
    word: string; // label
    vector: Float32Array; // vector representation, unified dimensionality
  }>
}

export interface VectorizeWordOpts {
  normalize: boolean;
  pad: boolean;
  pack: boolean;
  dimensionality: number; // wether to pad the vector
  tokenizer?: XLMRobertaTokenizer
}

export const isValidTerm = (word: string): boolean => {
  const hasLetter = /[a-z]/i.test(word);
  const containsNumber = /\d/.test(word);
  return hasLetter && (!containsNumber || word.length > 3) && word.length !== 1 && !word.includes(' ');
};


export const getTokenizer = (): XLMRobertaTokenizer => {
  const tokenizerConfig = JSON.parse(readFileSync('data/e5-large-tokenizer/tokenizer_config.json', 'utf-8'));
  const tokenizerJSON = JSON.parse(readFileSync('data/e5-large-tokenizer/tokenizer.json', 'utf-8'));
  return new XLMRobertaTokenizer(tokenizerJSON, tokenizerConfig);
}

export const vectorizeWord = (word: string, opts: VectorizeWordOpts) => {
  const tokenizer = typeof opts.tokenizer !== "undefined" ? opts.tokenizer : getTokenizer();
  const tokinizationResult = tokenizer([word], {
      padding: true,
      truncation: true,
  });

  const tokens = tokinizationResult.input_ids.data.slice(1, tokinizationResult.attention_mask.data.length - 1)
  let vector = new Float32Array(tokens.buffer);

  if (vector.length !== opts.dimensionality && opts.pad) {
    vector = padVector(vector, opts.dimensionality)
  }

  if (opts.pack) {
    vector = packVector(vector)
  }

  if (opts.normalize) {
    vector = normalizeVector(vector)
  }
  return vector;
}

export const vectorizeWordlists = (wordlistFilePath: string): VectorizedWordLists => {

  // https://medium.com/@lars.chr.wiik/how-modern-tokenization-works-d56013a78f1e
  const tokenizer = getTokenizer();

  const wordLists = JSON.parse(readFileSync(wordlistFilePath, 'utf-8'));
  const vectorizedWordLists: VectorizedWordLists = {}

  for (const langName in wordLists) {
      const words = wordLists[langName];
      const top10 = words.slice(0, 10);

      console.log('Language:', langName);
      console.log('Top 10:', top10);

      let tokenWordVectors = []

      //let maxDimensionality = 0;

      for (const word of words) {
        // tokenize input
        const tokinizationResult = tokenizer([word], {
            padding: true,
            truncation: true,
        });

        const tokens = tokinizationResult.input_ids.data.slice(1, tokinizationResult.attention_mask.data.length - 1)
        
        /*
        if (vector.length > maxDimensionality) {
            maxDimensionality = vector.length;
        }
        */

        // just not normalized yet
        tokenWordVectors.push({ word, vector: packVector(new Float32Array(tokens.buffer)) });
      }

      // ensuring unified dimensionality across all vectors
      /*
      tokenWordVectors = tokenWordVectors.map(({ word, vector }) => ({
        word,
        vector: packUnique4D(vector)//padVector(vector, maxDimensionality)
      }));
      */

      let isoLangName = "_unknown"
      switch(langName) {
        case "deu":
          isoLangName = "de";
          break;
        case "eng":
          isoLangName = "en";
          break;
      }
      vectorizedWordLists[isoLangName] = tokenWordVectors;
  }
  return vectorizedWordLists
}


export const packVector = (vector: Float32Array, dimensionality = 4): Float32Array => {
  let vector4D = new Float32Array(dimensionality);
  let i = 0;
  let j = 0;
  let sum = 0;
  let count = 0;

  while (i < dimensionality && j < vector.length) {
      if (vector[j] !== 0) {
          const scaledValue = scaleValueToExponent(vector[j])
          vector4D[i] = scaledValue;
          sum += scaledValue;
          count++;
          i++;
      }
      j++;
  }

  const mean = count > 0 ? sum / count : 0;

  /*
  // Fill the remaining positions with the mean value
  while (i < 4) {
      vector4D[i] = mean;
      i++;
  }
  */

  return vector4D;
  /*
  let accumulator = 0
  let vector4D = new Float32Array(4)
  for (let j=0; j<vector.length; j++) {
      accumulator += scaleValueToExponent(vector[j]);
  }
  vector4D.fill(accumulator/4, 0, 4)
  return vector4D
  */
}

export const removeSpecialCharsPerTokenizer = (input: string, iso2Code: string): string => {
  switch(iso2Code) {
    case "de":
      return input.replace(/[!"\$%&'()*+,\-./:;?€§«»›“”„’•…‒–—]/g, "");
    case "en":
      return input.replace(/[!"\$%&'()*+,\-./:;?€~»™“”‘’•…–—]/g, "");
    default:
      throw new Error("Special chars not categorized for this language")
  }
}