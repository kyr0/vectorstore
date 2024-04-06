import { MemoryUsageTracker } from "./memory-tracker";

/** benchmarks speed and mem usage in Node */
export const benchmarked = <T>(
  f: () => Promise<T>,
  validation: (result: T) => void,
  expectElapsedSeconds = 299,
  expectMemoryMegabytes = 2024,
) => {
  return async () => {
    const now = Date.now();
    const tracker = new MemoryUsageTracker();
    tracker.startTracking();

    const result = await f();

    const elapsed = (Date.now() - now) / 1000;
    console.log("benchmarked: elapsed secs", elapsed);
    const { averageMemory } = tracker.stopTracking();
    console.log("benchmarked: total memory usage was:", averageMemory, "MiB");

    if (expectElapsedSeconds) {
      expect(elapsed).toBeLessThanOrEqual(expectElapsedSeconds);
    }
    if (expectMemoryMegabytes) {
      expect(averageMemory).toBeLessThan(expectMemoryMegabytes);
    }
    return validation(result);
  };
};
