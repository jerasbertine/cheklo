import { describe, it, expect } from "vitest";
import { calculateMonthlyTotal, calculateAnnualTotal } from "./calculations.js";

describe("calculateMonthlyTotal", () => {
  it("sums monthly subscriptions as-is", () => {
    const result = calculateMonthlyTotal([
      { price: 10, frequency: "monthly" },
      { price: 20, frequency: "monthly" },
    ]);
    expect(result).toBe(30);
  });

  it("converts yearly subscriptions to their monthly equivalent", () => {
    const result = calculateMonthlyTotal([{ price: 120, frequency: "yearly" }]);
    expect(result).toBe(10);
  });

  it("returns 0 for an empty list", () => {
    expect(calculateMonthlyTotal([])).toBe(0);
  });

  it("rounds floating point imprecision to 2 decimals", () => {
    const result = calculateMonthlyTotal([
      { price: 13.49, frequency: "monthly" },
      { price: 120, frequency: "yearly" },
    ]);
    expect(result).toBe(23.49);
  });
});

describe("calculateAnnualTotal", () => {
  it("multiplies the monthly total by 12", () => {
    const result = calculateAnnualTotal([{ price: 10, frequency: "monthly" }]);
    expect(result).toBe(120);
  });

  it("rounds floating point imprecision to 2 decimals", () => {
    const result = calculateAnnualTotal([{ price: 2.99, frequency: "monthly" }]);
    expect(result).toBe(35.88);
  });
});
