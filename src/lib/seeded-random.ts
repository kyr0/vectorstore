class SeededRandom {
  private seed: number;

  constructor(seed = 42) {
    this.seed = seed;
  }

  next(): number {
    const mixedSeed = mix64(this.seed);
    // Update the seed with the mixed value to ensure the sequence is continued
    this.seed = mixedSeed;
    // Normalize and return a floating-point number in the range [0, 1)
    return (mixedSeed >>> 1) * (1.0 / (1 << 31));
  }

  nextInt(): number {
    return mix32(this.nextSeed());
  }

  nextLong(): number {
    return mix64(this.nextSeed());
  }

  private nextSeed(): number {
    // A simple seed update, consider using a more sophisticated update mechanism if necessary
    this.seed ^= this.seed << 13;
    this.seed ^= this.seed >> 17;
    this.seed ^= this.seed << 5;
    return this.seed;
  }

  split(newSeed: number): SeededRandom {
    return new SeededRandom(newSeed);
  }
}

function mix64(z: number): number {
  // Simplified mix function based on the description
  z = (z ^ (z >>> 30)) * Number("0xbf58476d1ce4e5b9");
  z = (z ^ (z >>> 27)) * Number("0x94d049bb133111eb");
  return Number(z ^ (z >>> 31));
}

function mix32(z: number): number {
  // Simplified mix function for 32 bits
  z = (z ^ (z >>> 33)) * Number("0x62a9d9ed799705f5");
  return Number(((z ^ (z >>> 28)) * Number("0xcb24d0a5c88c35b3")) >>> 32);
}

// Example Usage
