"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const {
  FILES,
  lineToInts,
  convertToModel,
  simulateDays,
  simulateFile,
} = require("./solution");

const EXAMPLE = {
  line: "3,4,3,1,2",
  fish: [3, 4, 3, 1, 2],
  model: [0, 1, 1, 2, 1, 0, 0, 0, 0],
  fishOnDays: [
    [3, 4, 3, 1, 2],
    [2, 3, 2, 0, 1],
    [1, 2, 1, 6, 0, 8],
    [0, 1, 0, 5, 6, 7, 8],
    [6, 0, 6, 4, 5, 6, 7, 8, 8],
    [5, 6, 5, 3, 4, 5, 6, 7, 7, 8],
    [4, 5, 4, 2, 3, 4, 5, 6, 6, 7],
    [3, 4, 3, 1, 2, 3, 4, 5, 5, 6],
    [2, 3, 2, 0, 1, 2, 3, 4, 4, 5],
    [1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 8],
    [0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 7, 8],
    [6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 7, 8, 8, 8],
    [5, 6, 5, 3, 4, 5, 6, 0, 0, 1, 5, 6, 7, 7, 7, 8, 8],
    [4, 5, 4, 2, 3, 4, 5, 6, 6, 0, 4, 5, 6, 6, 6, 7, 7, 8, 8],
    [3, 4, 3, 1, 2, 3, 4, 5, 5, 6, 3, 4, 5, 5, 5, 6, 6, 7, 7, 8],
    [2, 3, 2, 0, 1, 2, 3, 4, 4, 5, 2, 3, 4, 4, 4, 5, 5, 6, 6, 7],
    [1, 2, 1, 6, 0, 1, 2, 3, 3, 4, 1, 2, 3, 3, 3, 4, 4, 5, 5, 6, 8],
    [0, 1, 0, 5, 6, 0, 1, 2, 2, 3, 0, 1, 2, 2, 2, 3, 3, 4, 4, 5, 7, 8],
    [
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ],
  ],
};

describe("lineToInts", () => {
  test("with standard valid input", () => {
    const input = "6,0,6,4,5,6,0,1,1,2,6,0,1,1,1,2,2,3,3,4,6,7,8,8,8,8";
    const correct = [
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ];
    expect(lineToInts(input)).toEqual(correct);
  });
  test("without commas", () => {
    const input = "60645601126011122334678888";
    const correct = [
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ];
    expect(lineToInts(input)).toEqual(correct);
  });
  test("with rogue 9s", () => {
    const input = "6096456909911260119122334678888";
    const correct = [
      6, 0, 6, 4, 5, 6, 0, 1, 1, 2, 6, 0, 1, 1, 1, 2, 2, 3, 3, 4, 6, 7, 8, 8, 8,
      8,
    ];
    expect(lineToInts(input)).toEqual(correct);
  });
});

describe("convertToModel", () => {
  test("very simple", () => {
    const input = [6, 0, 6, 4, 5, 6, 0, 1];
    const correct = [2, 1, 0, 0, 1, 1, 3, 0, 0];
    expect(convertToModel(input)).toEqual(correct);
  });
});

describe("simulateDays", () => {
  describe("single day", () => {
    test("example first day", () => {
      const correct = [1, 1, 2, 1, 0, 0, 0, 0, 0];
      expect(simulateDays(EXAMPLE.model, 1)).toEqual(correct);
    });
    test("example first day, no number of days provided", () => {
      const correct = [1, 1, 2, 1, 0, 0, 0, 0, 0];
      expect(simulateDays(EXAMPLE.model)).toEqual(correct);
    });
  });
  describe("multiple days", () => {
    test("all example days", () => {
      const input = convertToModel(EXAMPLE.fishOnDays[0]);
      const correct = convertToModel(EXAMPLE.fishOnDays[18]);
      expect(simulateDays(input, 18)).toEqual(correct);
    });
  });
});

describe("simulateFile", () => {
  describe("example file", () => {
    test("18 days", () => {
      expect(simulateFile(FILES.test, 18)).toBe(26);
    });
    test("80 days", () => {
      expect(simulateFile(FILES.test, 80)).toBe(5934);
    });
  });
  describe("input file", () => {
    test("80 days", () => {
      expect(simulateFile(FILES.input, 80)).toBe(353274);
    });
    test("256 days", () => {
      expect(simulateFile(FILES.input, 256)).toBe(1609314870967);
    });
  });
});
