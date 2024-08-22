import { expect, describe, it } from "vitest";
import { roundNumber } from "./helpers";

describe("roundNumber function", () => {
  it("returns null with incorrect parameters", () => {
    expect(roundNumber()).toBeNull();
    expect(roundNumber("a", 1)).toBeNull();
    expect(roundNumber(1, "a")).toBeNull();
    expect(roundNumber(1, -1)).toBeNull();
    expect(roundNumber(NaN, 1)).toBeNull();
    expect(roundNumber(1, NaN)).toBeNull();
  });

  it("returns correctly", () => {
    expect(roundNumber(1.3444, 3)).toBeCloseTo(1.344);
    expect(roundNumber(1.7111, 1)).toBeCloseTo(1.7);
    expect(roundNumber(25.555, 2)).toBeCloseTo(25.56);
    expect(roundNumber(234.8544, 1)).toBeCloseTo(234.9);
    expect(roundNumber(12.5, 0)).toBeCloseTo(13);
  });
});
