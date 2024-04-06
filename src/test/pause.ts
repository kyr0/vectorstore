/* waits for a given amount of time in ms before it resolves the Promise returned */
export const pause = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
