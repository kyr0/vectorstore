import type { Tensor } from "@xenova/transformers";
import type { Document } from "../vector";

// Mocking the createDocument function for testing purposes, assuming a fixed dimension for embeddings
export const createMockDocument = (text: string, dims = 768): Document => {
  return {
    embeddings: {
      dims: [dims],
      type: "float32",
      data: new Float32Array(dims).fill(0.5), // Simplified mock data
      size: dims,
    } as unknown as Tensor,
    metadata: { text: `search_document: ${text}` },
  };
};
