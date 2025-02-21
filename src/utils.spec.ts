// utils.spec.ts
// Martin Pravda

import {pick, formatTimestamp, colorify, formatText} from "./utils";

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

  describe("formatText", () => {
    it("formats BKN text into red", () => {
      expect(formatText("BKN25")).toBe(`<font color="blue">BKN25</font>`);
    });

    it("formats BKN text into red", () => {
      expect(formatText("BKN31")).toBe(`<font color="red">BKN31</font>`);
    });
  });

  describe("colorify", () => {
    it("colorizes given text", () => {
      expect(colorify("BKN25", "yellow")).toBe(
        `<font color="yellow">BKN25</font>`
      );
    });
  });
});
