"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const { FILES, parseLines, tallyAny, runFile } = require("./solution");

const TEST_VALUES = {
  exampleInput: [
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ],
};

describe("parseLines", () => {
  test("parses some basic patterns", () => {
    const inputLines = ["8,0 -> 0,8", "2,2 -> 2,1", "0,9 -> 2,9", "6,4 -> 2,0"];
    const calculated = parseLines(inputLines);
    const correct = [
      {
        x1: 8,
        y1: 0,
        x2: 0,
        y2: 8,
      },
      {
        x1: 2,
        y1: 2,
        x2: 2,
        y2: 1,
      },
      {
        x1: 0,
        y1: 9,
        x2: 2,
        y2: 9,
      },
      {
        x1: 6,
        y1: 4,
        x2: 2,
        y2: 0,
      },
    ];
    expect(calculated).toEqual(correct);
  });
});

describe.skip("tallyNoDiagonals", () => {});

describe("tallyAny", () => {
  test("without diagonal inputs", () => {
    const input = [
      {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 3,
      },
      {
        x1: 2,
        y1: 1,
        x2: 4,
        y2: 1,
      },
      {
        x1: 3,
        y1: 1,
        x2: 3,
        y2: 3,
      },
    ];
    const correct = {
      cells: {
        "0,0": 1,
        "0,1": 1,
        "0,2": 1,
        "0,3": 1,
        "2,1": 1,
        "3,1": 2,
        "4,1": 1,
        "3,2": 1,
        "3,3": 1,
      },
      overlapCount: 1,
    };
    expect(tallyAny(input)).toEqual(correct);
  });

  test("with diagonal inputs", () => {
    const input = [
      {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 3,
      },
      {
        x1: 2,
        y1: 1,
        x2: 4,
        y2: 1,
      },
      {
        x1: 3,
        y1: 1,
        x2: 3,
        y2: 3,
      },
      {
        x1: 0,
        y1: 0,
        x2: 3,
        y2: 3,
      },
      {
        x1: 0,
        y1: 4,
        x2: 4,
        y2: 0,
      },
    ];
    const correctCells = {
      "0,0": 2,
      "0,1": 1,
      "0,2": 1,
      "0,3": 1,
      "0,4": 1,
      "1,1": 1,
      "1,3": 1,
      "2,1": 1,
      "2,2": 2,
      "3,1": 3,
      "3,2": 1,
      "3,3": 2,
      "4,0": 1,
      "4,1": 1,
    };
    const correctCount = 4;
    expect(tallyAny(input)).toEqual({
      cells: correctCells,
      overlapCount: correctCount,
    });
  });
});

describe("runFile", () => {
  describe("ignoring diagonals", () => {
    test("on test, ignoring diagonals", () => {
      const calculated = runFile(FILES.test, true);
      expect(calculated.overlapCount).toBe(5);
    });

    test("on puzzle input, ignoring diagonals", () => {
      const calculated = runFile(FILES.input, true);
      expect(calculated.overlapCount).toBe(4873);
    });
  });

  describe("with diagonals", () => {
    test("on test, with diagonals", () => {
      const calculated = runFile(FILES.test, false);
      expect(calculated.overlapCount).toBe(12);
    });

    test("on puzzle input, with diagonals", () => {
      const calculated = runFile(FILES.input, false);
      expect(calculated.overlapCount).toBe(19472);
    });
  });
});
