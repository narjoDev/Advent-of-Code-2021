"use strict";
/* jshint 
esversion: 11,
devel: true,
node: true,
-W097 
*/

const { readFile, splitByLines } = require("../libs/get-input");

const FILES = {
  test: "./day-05/test-from-prompt.txt",
  input: "./day-05/input.txt",
};

// **********
// PART ONE
// Consider only horizontal and vertical lines.
// At how many points do at least two lines overlap?
// **********

function parseLines(lines) {
  let segments = [];

  // consider using map or filter?
  lines.forEach((line) => {
    const pattern = /^(\d+),(\d+) -> (\d+),(\d+)$/;
    const [, x1, y1, x2, y2] = line.match(pattern).map((v) => parseInt(v));
    const segment = {
      x1,
      y1,
      x2,
      y2,
    };
    segments.push(segment);
  });

  return segments;
}

function removeDiagonals(segments) {
  return segments.filter(({ x1, y1, x2, y2 }) => {
    // const { x1, y1, x2, y2 } = segment;
    return x1 === x2 || y1 === y2;
  });
}

function tallyAny(segments) {
  const cells = {};
  let overlapCount = 0;

  segments.forEach(({ x1, y1, x2, y2 }) => {
    // const { x1, y1, x2, y2 } = segment;

    // distance moved in each direction
    const changeX = x2 - x1;
    const changeY = y2 - y1;
    const length = changeX !== 0 ? Math.abs(changeX) : Math.abs(changeY);
    // direction of change in coordinate when moving from one point to the other
    const signX = Math.sign(changeX);
    const signY = Math.sign(changeY);

    for (let i = 0; i <= length; i++) {
      const thisX = x1 + i * signX;
      const thisY = y1 + i * signY;
      const key = `${thisX},${thisY}`;

      // if it doesn't exist, it's 0
      const currentValue = cells[key] ?? 0;
      if (currentValue === 1) overlapCount++;
      cells[key] = currentValue + 1;

      // if (cells.hasOwnProperty(key)) {
      //   // this would be the first overlap counted
      //   if (cells[key] === 1) {
      //     overlapCount++;
      //   }
      //   cells[key] += 1;
      // } else {
      //   cells[key] = 1;
      // }
    }
  });

  return {
    cells,
    overlapCount,
  };
}

function runFile(filename, skipDiagonals = false) {
  let segments = parseLines(splitByLines(readFile(filename)));
  if (skipDiagonals) segments = removeDiagonals(segments);
  const tally = tallyAny(segments);
  return tally;
}

// console.log(
//   "test file, ignore diagonals",
//   runFile(FILES.test, true).overlapCount
// );
// console.log(
//   "part one (ignore diagonals)",
//   runFile(FILES.input, true).overlapCount
// );
// console.log(runFile(FILES.input, false).overlapCount);

module.exports = { FILES, parseLines, tallyAny, runFile };
