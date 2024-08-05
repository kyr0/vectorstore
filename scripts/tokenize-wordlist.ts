import { writeFileSync } from "fs";
import { vectorizeWordlists } from "../src/test/wordlist";

writeFileSync('data/dense_vectors.json', JSON.stringify(vectorizeWordlists('data/languageWordDiscriminators.json'), null, 2));

