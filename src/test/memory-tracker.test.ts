import { beforeEach, describe, expect, it } from "vitest";
import { MemoryUsageTracker } from "./memory-tracker"; // Adjust the import path as necessary
import { pause } from "./pause";

describe("unit: MemoryUsageTracker", () => {
  let tracker: MemoryUsageTracker;

  beforeEach(() => {
    tracker = new MemoryUsageTracker();
  });

  it("unit: starts and stops tracking without errors", () => {
    expect(() => tracker.startTracking()).not.toThrow();
    expect(() => tracker.stopTracking()).not.toThrow();
  });

  it("unit: provides memory usage statistics", async () => {
    tracker.startTracking(100); // use a shorter interval for the test

    // wait a bit to ensure some data is collected
    await new Promise((resolve) => setTimeout(resolve, 500));

    const stats = tracker.stopTracking();

    // validate the shape of the statistics object
    expect(stats).toHaveProperty("averageHeapSize");
    expect(stats).toHaveProperty("averageExternalMemory");
    expect(stats).toHaveProperty("averageMemory");

    // ensure the stats are numbers and within a plausible range
    // note: These checks are very basic and assume some memory usage during the test.
    // adjust the expectations based on your application's memory usage profile.
    expect(stats.averageHeapSize).toBeGreaterThan(0);
    expect(stats.averageExternalMemory).toBeGreaterThan(0);
    expect(stats.averageMemory).toBeGreaterThan(0);
  });

  it("unit: detects a significant memory allocation spike", async () => {
    // start tracking memory usage
    tracker.startTracking(100);

    // allocate ~100MB of memory
    const largeArray = new Array(10000000).fill(
      "A string that is approximately 10 bytes long",
    );

    // allow some time for memory tracking to catch up
    await pause(500);

    // stop tracking and get statistics
    const stats = tracker.stopTracking();

    // assuming the memory spike is caught, the average heap size should reflect this.
    // the exact number may vary, so we check if it's significantly higher than before.
    expect(stats.averageHeapSize).toBeGreaterThan(50);
    expect(stats.averageMemory).toBeLessThan(100);
    expect(stats.averageExternalMemory).toBeLessThan(50);

    // cleanup to help with memory release
    largeArray.length = 0;
  });
});
