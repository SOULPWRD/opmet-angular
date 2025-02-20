import {pick, formatTimestamp} from "./utils";

const o = {a: 1, b: 2, c: 3, d: 4};

describe("Utils", () => {
  describe("pick", () => {
    it("picks selected properties", () => {
      expect(pick(o, ["a", "d"])).toEqual({a: 1, d: 4});
    });

    it("pick sselected properties and format value", () => {
      const square = (val: number) => val * val;
      // @ts-expect-error bad-typing
      expect(pick(o, ["a", ["d", square]])).toEqual({a: 1, d: 16});
    });
  });

  describe("formatTimestamp", () => {
    it("formats timestamp into friendly form", () => {
      const timestamp = "2025-02-20T13:20:00Z";
      expect(formatTimestamp(timestamp)).toBe("20.02.2025 13:20:00");
    });
  });
});
