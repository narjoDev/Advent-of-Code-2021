"use strict";
/* jshint 
esversion: 7,
devel: true,
node: true,
-W097 
*/

const { readFile, splitByLines } = require("../libs/get-input");

const FILES = {
  example: "./day-07/example-input.txt",
  input: "./day-07/puzzle-input.txt",
};

const lineToInts = (line) => line.match(/\d+/g).map((v) => parseInt(v));

/**
 * Finds the minimum and maximum numbers in an array
 * @param {Array<number>} numbers
 * @returns {Array<number>} [min, max]
 */
function minAndMax(numbers) {
  let min = numbers[0];
  let max = min;

  for (let i = 1; i < numbers.length; i++) {
    min = Math.min(min, numbers[i]);
    max = Math.max(max, numbers[i]);
  }

  return [min, max];
}

/**
 *
 * @param {Array<number>} crabs positions of the crabs
 * @param {number} position position for the crabs to line up
 * @returns {number} cost of all crabs moving to position
 */
function checkCost(crabs, position) {
  return crabs.reduce((cost, crab) => cost + Math.abs(position - crab), 0);
}

function checkIncreasingCost(crabs, position) {
  return crabs.reduce((cost, crab) => {
    const distance = Math.abs(position - crab);
    const thisCost = (distance ** 2 + distance) / 2;
    return cost + thisCost;
  }, 0);
}

/**
 *
 * @param {Array<number>} crabs
 * @param {number} min
 * @param {number} max
 * @returns {Array<number>} cheapest position and its cost
 */
function searchPositions(crabs, min, max, costFunc) {
  const diff = max - min;

  if (diff === 0) {
    return [min, costFunc(crabs, min)];
  } else {
    const posA = min + Math.floor(diff / 2);
    const posB = posA + 1;
    const costA = costFunc(crabs, posA);
    const costB = costFunc(crabs, posB);

    if (costA === costB) {
      return [posA, costA];
    } else if (costA < costB) {
      return searchPositions(crabs, min, posA, costFunc);
    } else {
      return searchPositions(crabs, posB, max, costFunc);
    }
  }
}

function partOne(filename) {
  const crabs = lineToInts(splitByLines(readFile(filename))[0]);
  const [min, max] = minAndMax(crabs);
  const [pos, cost] = searchPositions(crabs, min, max, checkCost);
  return cost;
}

function partTwo(filename) {
  const crabs = lineToInts(splitByLines(readFile(filename))[0]);
  const [min, max] = minAndMax(crabs);
  const [pos, cost] = searchPositions(crabs, min, max, checkIncreasingCost);
  return cost;
}

// console.log(partOne(FILES.example));
// console.log(partOne(FILES.input));

// console.log(partTwo(FILES.example));
// console.log(partTwo(FILES.input));

module.exports = {
  FILES,
  minAndMax,
  checkCost,
  searchPositions,
  partOne,
  partTwo,
};
