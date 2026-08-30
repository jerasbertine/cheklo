import { describe, it, expect } from "vitest";
import { calculateUsefulnessScore } from "./score.js";

describe("calculateUsefulnessScore", () => {
  it("returns not_rated with no history at all", () => {
    const result = calculateUsefulnessScore([]);
    expect(result).toEqual({ category: "not_rated", ratio: null });
  });

  it("returns high with all yes", () => {
    const result = calculateUsefulnessScore([
      { month: 6, year: 2026, response: "yes" },
      { month: 7, year: 2026, response: "yes" },
      { month: 8, year: 2026, response: "yes" },
    ]);
    expect(result).toEqual({ category: "high", ratio: 1 });
  });

  it("returns low with all no", () => {
    const result = calculateUsefulnessScore([
      { month: 6, year: 2026, response: "no" },
      { month: 7, year: 2026, response: "no" },
      { month: 8, year: 2026, response: "no" },
    ]);
    expect(result).toEqual({ category: "low", ratio: 0 });
  });

  it("weighs mixed as half a point", () => {
    const result = calculateUsefulnessScore([
      { month: 8, year: 2026, response: "mixed" },
    ]);
    expect(result).toEqual({ category: "medium", ratio: 0.5 });
  });

  it("only considers the 3 most recent check-ins, ignoring older ones", () => {
    const result = calculateUsefulnessScore([
      { month: 1, year: 2026, response: "no" },
      { month: 6, year: 2026, response: "yes" },
      { month: 7, year: 2026, response: "yes" },
      { month: 8, year: 2026, response: "no" },
    ]);
    expect(result).toEqual({ category: "high", ratio: 0.67 });
  });

  it("sorts correctly across a year boundary", () => {
    const result = calculateUsefulnessScore([
      { month: 12, year: 2025, response: "no" },
      { month: 1, year: 2026, response: "yes" },
    ]);
    expect(result).toEqual({ category: "medium", ratio: 0.5 });
  });
});
