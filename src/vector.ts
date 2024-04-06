import {
  type FeatureExtractionPipeline,
  pipeline,
  type Tensor,
} from "@xenova/transformers";

export type MetaData = Record<string, any>;

export type SearchResult = {
  doc: Document;
  score: number;
};

export type Document = {
  embeddings: Tensor;
  metadata: MetaData;
};

export const roundToTwo = (num: number): number =>
  Math.round((num + Number.EPSILON) * 100) / 100;

/** checks if two tensors have the same dimensionality */
export const checkDimensionality = (tensor1: Tensor, tensor2: Tensor): void => {
  if (tensor1.size !== tensor2.size) {
    throw new Error("Tensors must have the same dimensionality.");
  }
};

/** computes the dot product of two vectors represented as tensors */
export const dotProduct = (tensor1: Tensor, tensor2: Tensor): number => {
  checkDimensionality(tensor1, tensor2);

  let sum = 0;
  for (let i = 0; i < tensor1.data.length; i++) {
    sum += tensor1.data[i] * tensor2.data[i];
  }
  return sum;
};

/** computes the magnitude of a vector represented as a tensor using the dot product */
export const magnitude = (tensor: Tensor): number =>
  Math.sqrt(dotProduct(tensor, tensor));

/** computes the cosine similarity between two document tensors */
export const cosineSimilarity = (doc1: Document, doc2: Document): number => {
  checkDimensionality(doc1.embeddings, doc2.embeddings);

  const mag1 = magnitude(doc1.embeddings);
  const mag2 = magnitude(doc2.embeddings);
  if (mag1 === 0 || mag2 === 0) {
    throw new Error("Cannot compute similarity with zero magnitude vector.");
  }
  return dotProduct(doc1.embeddings, doc2.embeddings) / (mag1 * mag2);
};

/** computes the cosine similarity for each document tensor in comparison to the query document tensor */
export const search = (
  docs: Document[],
  queryDoc: Document,
  topP: number = docs.length,
): SearchResult[] => {
  return docs
    .map((doc) => ({
      doc,
      score: cosineSimilarity(doc, queryDoc),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topP);
};

/** creates a document made of text turned into a vector embedding, associated with meta data */
export const createDocument = async (
  text: string,
  metaData: MetaData = {},
): Promise<Document> => {
  const inference = await getModel();
  const embeddings = await inference([text], {
    pooling: "mean",
    normalize: true,
  });
  return {
    embeddings: embeddings[0],
    metadata: metaData,
  };
};

let extractor: FeatureExtractionPipeline;

/** downloads, caches, and instantiates the model for inference */
export const getModel = async (reporter: Function = () => {}) => {
  if (typeof extractor === "undefined") {
    extractor = await pipeline(
      "feature-extraction",
      "nomic-ai/nomic-embed-text-v1",
      {
        quantized: false,
        progress_callback: reporter,
      },
    );
  }
  return extractor;
};

/** makes sure the model is downloaded and cached; may provide a reporter */
export const init = async (reporter: Function = () => {}) =>
  await getModel(reporter);
