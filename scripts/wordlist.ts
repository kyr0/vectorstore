import { readFileSync, writeFileSync } from "fs";
import { isValidTerm } from "../src/test/wordlist";

const corpora = ['data/deu_news_2023_10K-words.txt', 'data/eng_news_2023_10K-words.txt'];

const languageMostFrequentWords = {}
for (const corpusFile of corpora) {
  const text = readFileSync(corpusFile, 'utf-8');
  const langName = corpusFile.split('/')[1].split('_')[0];
  const lines = text.split('\n');
  const lineData = lines.map(line => line.split('\t'));

  const words = new Set();

  for (let i=0; i<lineData.length; i++) {
    if (i < 31) continue;
    const line = lineData[i];
    const word = line[1];
    const freq = parseInt(line[2]);

    if (freq > 1 && isValidTerm(word)) {
      words.add(word.toLowerCase());
    }
  }
  languageMostFrequentWords[langName] = words;
}

// find the intersection of words across all languages
const allWords: Array<Set<string>> = Object.values(languageMostFrequentWords);
const commonWords = new Set<string>();

// initialize commonWords with the words of the first language
if (allWords.length > 0) {
  for (const word of allWords[0]) {
    let isCommon = true;
    for (let i = 1; i < allWords.length; i++) {
      if (!allWords[i].has(word)) {
        isCommon = false;
        break;
      }
    }
    if (isCommon) {
      commonWords.add(word);
    }
  }
}

// remove the common words from each language's set
for (const langName in languageMostFrequentWords) {
  const wordSet = languageMostFrequentWords[langName];
  for (const word of commonWords) {
    wordSet.delete(word);
  }
}

let languageWordDiscriminators = {}

// log the results
for (const langName in languageMostFrequentWords) {

  const words = Array.from(languageMostFrequentWords[langName])
  languageWordDiscriminators = {
    ...languageWordDiscriminators,
    [langName]: words
  }

  console.log('Language:', langName);
  console.log('Words:', words.length);
}

writeFileSync('data/languageWordDiscriminators.json', JSON.stringify(languageWordDiscriminators, null, 2));

