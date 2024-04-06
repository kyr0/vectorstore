import { memoryUsage } from "node:process";
import { roundToTwo } from "../vector";

type MemoryUsageStats = {
  averageHeapSize: number;
  averageExternalMemory: number;
  averageMemory: number;
};

/** Tracks memory usage over time and averages in intervals */
export class MemoryUsageTracker {
  private intervalId: NodeJS.Timer | null = null;
  private heapSizes: number[] = [];
  private externalMemories: number[] = [];

  startTracking(intervalMs = 100): void {
    this.intervalId = setInterval(() => {
      this.collect();
    }, intervalMs);
    // ensure, we collect the first sample immediately
    // to avoid NaN before the first measurement interval
    this.collect();
  }

  collect() {
    const { heapUsed, external } = memoryUsage();
    this.heapSizes.push(heapUsed);
    this.externalMemories.push(external);
  }

  stopTracking(): MemoryUsageStats {
    if (this.intervalId) {
      clearInterval(this.intervalId as any);
      this.intervalId = null;
    }

    const averageHeapSize =
      this.heapSizes.reduce((acc, cur) => acc + cur, 0) / this.heapSizes.length;
    const averageExternalMemory =
      this.externalMemories.reduce((acc, cur) => acc + cur, 0) /
      this.externalMemories.length;

    this.heapSizes = [];
    this.externalMemories = [];

    // ensure we handle division by zero if stopTracking is called without any tracking data
    const totalSamples = this.heapSizes.length || 1;

    return {
      averageHeapSize: roundToTwo(averageHeapSize / 1024 / 1024),
      averageExternalMemory: roundToTwo(averageExternalMemory / 1024 / 1024),
      averageMemory: roundToTwo(
        (averageHeapSize + averageExternalMemory) / 1024 / 1024 / totalSamples,
      ),
    };
  }
}
