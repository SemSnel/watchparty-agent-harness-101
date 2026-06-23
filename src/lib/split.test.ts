import { describe, it, expect } from "vitest";
import { splitEvenly, splitFairly } from "./split";

describe("splitEvenly", () => {
  it("splits a clean amount evenly", () => {
    // $42.00 across 3 people -> $14.00 each
    expect(splitEvenly(4200, 3)).toBe(1400);
  });

  it("rounds down on a non-divisible amount", () => {
    // $10.00 across 3 people -> $3.33 each (1 cent remainder left over)
    expect(splitEvenly(1000, 3)).toBe(333);
  });

  it("throws when people is less than 1", () => {
    expect(() => splitEvenly(1000, 0)).toThrow();
  });
});

describe("splitFairly", () => {
  it("sums exactly to the total, spreading the remainder", () => {
    const parts = splitFairly(1000, 3);
    expect(parts).toEqual([334, 333, 333]);
    expect(parts.reduce((a, b) => a + b, 0)).toBe(1000);
  });

  it("splits evenly divisible amounts with no remainder", () => {
    expect(splitFairly(4200, 3)).toEqual([1400, 1400, 1400]);
  });
});
