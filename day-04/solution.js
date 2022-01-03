"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { readFile, splitByLines } = require("../libs/get-input");

// Filenames
const USE_PREFIX = true;
const FOLDER_PREFIX = USE_PREFIX ? "./day-04/" : "";
const TEST_INPUT = `${FOLDER_PREFIX}test-from-prompt.txt`;
const PUZZLE_INPUT = `${FOLDER_PREFIX}input.txt`;

/**
 * Accept raw lines of input. Output sequence of drawn numbers and set of boards.
 * Input should be:
 * a line of comma-separated numbers,
 * a blank line,
 * lines of whitespace-separated numbers, in groups of five lines, separated by blank lines
 * @param {Array<string>} lines
 * @returns
 */
function parseInput(lines) {
  let drawSequence = lines[0].match(/\d+/g).map((v) => parseInt(v));
  let boards = [];

  let boardInProgress = [];

  for (const line of lines.slice(1)) {
    if (line === "") {
      if (boardInProgress.length > 0) {
        boards.push(boardInProgress);
      }
      boardInProgress = [];
      continue;
    } else {
      const parsedLine = line.match(/\d+/g).map((v) => parseInt(v));
      boardInProgress.push(parsedLine);
    }
  }

  if (boardInProgress.length > 0) {
    boards.push(boardInProgress);
  }

  return { drawSequence: drawSequence, boards: boards };
}

// NOT BEING USED, SEE winAndScore
function isComplete(board, drawn) {
  let columnsAreValid = Array(board[0].length).fill(true);
  // for each row
  for (let r = 0; r < board.length; r++) {
    const row = board[r];
    let rowIsValid = true;
    // for each column
    for (let c = 0; c < row.length; c++) {
      // unmarked number invalidates row and column
      if (!drawn.includes(row[c])) {
        rowIsValid = false;
        columnsAreValid[c] = false;
      }
    }
    // all columns in row parsed
    if (rowIsValid) return true;
  }
  // all rows parsed
  if (columnsAreValid.includes(true)) return true;
  else return false;
}

// NOT BEING USED, SEE winAndScore
function scoreBoard(board, drawn) {
  const lastNumber = drawn[drawn.length - 1];
  const sumOfUnmarked = board.reduce((boardSum, row) => {
    return (
      boardSum +
      row.reduce((rowSum, cell) => {
        return drawn.includes(cell) ? rowSum : rowSum + cell;
      }, 0)
    );
  }, 0);
  return lastNumber * sumOfUnmarked;
}

function winAndScore(board, drawn) {
  let columnsAreValid = Array(board[0].length).fill(true);
  let sumOfUnmarked = 0;
  const lastNumber = drawn[drawn.length - 1];
  let won = false;

  // for each row
  for (let r = 0; r < board.length; r++) {
    const row = board[r];
    let rowIsValid = true;
    // for each column
    for (let c = 0; c < row.length; c++) {
      // unmarked number invalidates row and column
      if (!drawn.includes(row[c])) {
        rowIsValid = false;
        columnsAreValid[c] = false;
        sumOfUnmarked += row[c];
      }
    }
    // all cells in row parsed
    if (rowIsValid) won = true;
  }
  // all rows parsed
  if (columnsAreValid.includes(true)) won = true;
  // TODO: score even if !won
  const score = won ? lastNumber * sumOfUnmarked : 0;
  return {
    won: won,
    score: score,
  };
}

function runGame(boards, drawn) {
  let gameIsOver = false;
  let winningBoard = 0; // NOT 0-INDEXED
  let score = 0;
  // iterate through drawn numbers
  for (let i = 0; i < drawn.length; i++) {
    // check all boards
    for (let j = 0; j < boards.length; j++) {
      const { won: thisWon, score: thisScore } = winAndScore(
        boards[j],
        drawn.slice(0, i + 1)
      );
      if (thisWon) {
        gameIsOver = true;
        winningBoard = j + 1;
        score = thisScore;
        break;
      }
    }
    if (gameIsOver) break;
  }

  return {
    gameIsOver,
    winningBoard,
    score,
  };
}

function runFile(filename) {
  const lines = splitByLines(readFile(filename));
  const { drawSequence, boards } = parseInput(lines);
  const gameResult = runGame(boards, drawSequence);
  console.log(gameResult);
  return gameResult;
}

// may depend on running file from parent folder
// runFile(TEST_INPUT);
// runFile(PUZZLE_INPUT);

// PART TWO
// Figure out which board will win last.
// Once it wins, what would its final score be?

// TODO: write tests
function orderWinners(boards, drawn) {
  let activeIndices = [];
  for (let i = 0; i < boards.length; i++) activeIndices.push(i);

  // [{index, score}]
  let winners = [];

  // iterate through drawn numbers
  for (let i = 0; i < drawn.length; i++) {
    // check all ACTIVE boards
    for (let j = 0; j < activeIndices.length; j++) {
      const boardIndex = activeIndices[j];
      const board = boards[boardIndex];
      const { won: thisWon, score: thisScore } = winAndScore(
        board,
        drawn.slice(0, i + 1)
      );
      if (thisWon) {
        activeIndices.splice(j, 1); // remove victorious board
        j--;
        winners.push({ index: boardIndex, score: thisScore });
      }
    }
  }

  return winners;
}

const testDrawn = [22, 13, 17, 11, 0, 3, 15, 2, 14, 21, 24, 4];
const testBoards = [
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
];
// const RESULT = orderWinners(testBoards, testDrawn);
// console.log(RESULT);

function findLast(boards, drawn) {
  const winners = orderWinners(boards, drawn);
  const last = winners[winners.length - 1];
  return last;
}

function runPartTwo(filename) {
  const lines = splitByLines(readFile(filename));
  const { drawSequence, boards } = parseInput(lines);
  const last = findLast(boards, drawSequence);
  console.log(last);
  return last;
}

console.log(runPartTwo(TEST_INPUT));
console.log(runPartTwo(PUZZLE_INPUT));

// For test suite
module.exports = {
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
};
