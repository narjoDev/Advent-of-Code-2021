"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const {
  parseInput,
  isComplete,
  scoreBoard,
  winAndScore,
  runGame,
  runFile,
  orderWinners,
  findLast,
  TEST_INPUT,
  PUZZLE_INPUT,
} = require("./solution");

const TEST_VALUES = {
  testInput: [
    "7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1",
    "",
    "22 13 17 11 0",
    "8 2 23 4 24",
    "21 9 14 16 7",
    "6 10 3 18 5",
    "1 12 20 15 19",
    "",
    "3 15 0 2 22",
    "9 18 13 17 5",
    "19 8 7 25 23",
    "20 11 10 24 4",
    "14 21 16 12 6",
    "",
    "14 21 17 24 4",
    "10 16 15 9 19",
    "18 8 23 26 20",
    "22 11 13 6 5",
    "2 0 12 3 7",
    "",
  ],
  testDrawn: [
    7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
    20, 8, 19, 3, 26, 1,
  ],
  testBoards: [
    [
      [22, 13, 17, 11, 0],
      [8, 2, 23, 4, 24],
      [21, 9, 14, 16, 7],
      [6, 10, 3, 18, 5],
      [1, 12, 20, 15, 19],
    ],
    [
      [3, 15, 0, 2, 22],
      [9, 18, 13, 17, 5],
      [19, 8, 7, 25, 23],
      [20, 11, 10, 24, 4],
      [14, 21, 16, 12, 6],
    ],
    [
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ],
  ],
};

// **********
// PARSING INPUT
// **********

describe("parseInput", () => {
  test("reads sequence of drawn numbers", () => {
    const input = ["4,8,15,16,23,42"];
    const expectedDrawn = [4, 8, 15, 16, 23, 42];
    expect(parseInput(input).drawSequence).toEqual(expectedDrawn);
  });

  test("reads only first line", () => {
    const input = ["1,2,3", "4,5,6", "4,7,5"];
    const expectedDrawn = [1, 2, 3];
    expect(parseInput(input).drawSequence).toEqual(expectedDrawn);
  });

  test("reads first board", () => {
    expect(parseInput(TEST_VALUES.testInput).boards[0]).toEqual(
      TEST_VALUES.testBoards[0]
    );
  });

  test("reads sample boards", () => {
    expect(parseInput(TEST_VALUES.testInput).boards).toEqual(
      TEST_VALUES.testBoards
    );
  });
});

// **********
// BOARD OPERATIONS
// **********

// TODO: iterate through list of input:value pairs
// TODO: generate test values programmatically
describe("operations on a single board", () => {
  const templateBoard = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25],
  ];

  describe("recognizes complete board", () => {
    test("when drawn values equal first row", () => {
      const drawnValues = [1, 2, 3, 4, 5];
      expect(isComplete(templateBoard, drawnValues)).toBe(true);
    });

    test("when drawn values equal first column", () => {
      const drawnValues = [1, 6, 11, 16, 21];
      expect(isComplete(templateBoard, drawnValues)).toBe(true);
    });
  });

  describe("recognizes incomplete board", () => {
    test("with complete diagonals", () => {
      const firstDiagonal = [1, 7, 13, 19, 25];
      const secondDiagonal = [21, 17, 13, 9, 5];
      expect(isComplete(templateBoard, firstDiagonal)).toBe(false);
      expect(isComplete(templateBoard, secondDiagonal)).toBe(false);
    });
  });

  describe("score winning board", () => {
    test("with a winning row ", () => {
      const drawnValues = [1, 2, 3, 4, 5];
      const correctScore = 310 * 5;
      expect(scoreBoard(templateBoard, drawnValues)).toBe(correctScore);
    });
    test("with a winning column ", () => {
      const drawnValues = [1, 6, 11, 16, 21];
      const correctScore = 270 * 21;
      expect(scoreBoard(templateBoard, drawnValues)).toBe(correctScore);
    });
  });

  describe("check win and score together", () => {
    test("recognize win and score winning row", () => {
      const drawnValues = [1, 2, 3, 4, 5];
      const correctScore = 310 * 5;
      expect(winAndScore(templateBoard, drawnValues)).toEqual({
        won: true,
        score: correctScore,
      });
    });

    test("recognize win and score winning column", () => {
      const drawnValues = [1, 6, 11, 16, 21];
      const correctScore = 270 * 21;
      expect(winAndScore(templateBoard, drawnValues)).toEqual({
        won: true,
        score: correctScore,
      });
    });

    test("recognize incomplete board and score 0", () => {
      const drawnValues = [1, 42, 43, 44, 45];
      expect(winAndScore(templateBoard, drawnValues)).toEqual({
        won: false,
        score: 0,
      });
    });
  });
});

// **********
// RUN GAME
// **********

describe("run a game", () => {
  test("from test input", () => {
    expect(runGame(TEST_VALUES.testBoards, TEST_VALUES.testDrawn)).toEqual({
      gameIsOver: true,
      winningBoard: 3,
      score: 4512,
    });
  });
});

// **********
// RUN GAME FROM FILE
// **********

describe("run games given filenames", () => {
  test("running prompt test file", () => {
    expect(runFile(TEST_INPUT)).toEqual({
      gameIsOver: true,
      winningBoard: 3,
      score: 4512,
    });
  });
});

// **********
// PART TWO
// **********

describe("put winners in order", () => {
  test("with boards in order", () => {
    const drawn = [22, 13, 17, 11, 0, 3, 15, 2, 14, 21, 24, 4];
    const ran = orderWinners(TEST_VALUES.testBoards, drawn);
    const winningIndexes = ran.map((v) => v.index);
    const expectedWinners = [0, 1, 2];
    expect(winningIndexes).toEqual(expectedWinners);
  });
});

// describe("pick last winner", () => {
//   test("with boards in order", () => {
//     // const ran = findLast(TEST_INPUT);
//   });
// });
