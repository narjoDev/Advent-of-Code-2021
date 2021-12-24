"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const TEST_INPUT = "test-from-prompt.txt";
const PUZZLE_INPUT = "input.txt";

const fs = require("fs");

function readFile(filename, encoding = "utf8") {
  try {
    const data = fs.readFileSync(filename, encoding);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function splitByLines(string) {
  const lineEndPattern = /\r?\n/;
  return string.split(lineEndPattern);
}

function getBitBalance(binaryStrings) {
  // Track surplus of 1 over 0 for each digit
  let bitBalance = Array(binaryStrings[0].length).fill(0);

  binaryStrings.forEach((binary) => {
    for (let i = 0; i < binary.length; i++) {
      bitBalance[i] += binary[i] === "1" ? 1 : -1;
    }
  });

  return bitBalance;
}

function singleBitBalance(binaryStrings, index = 0) {
  let bitBalance = 0;

  binaryStrings.forEach((binary) => {
    bitBalance += binary[index] === "1" ? 1 : -1;
  });

  return bitBalance;
}

/**
 * Accepts an array of string representations of binary numbers,
 * returning an array of numbers representing the most common bits in the input array.
 *
 * @param {Array<String>} binaryStrings array of equal length strings representing binary numbers
 * @returns {Array<Number>}
 */
function findCommonBits(binaryStrings, ifTied = 1) {
  return getBitBalance(binaryStrings).map((v) => (v < 1 - ifTied ? 0 : 1));
}

/**
 *
 * @param {Array<Number>} bits
 * @returns {Object}
 */
function bitsToValues(bits) {
  const gamma = parseInt(bits.join(""), 2);
  const flippedBits = bits.map((v) => 1 - v);
  const epsilon = parseInt(flippedBits.join(""), 2);
  const powerConsumption = gamma * epsilon;
  return {
    gamma: gamma,
    epsilon: epsilon,
    power: powerConsumption,
  };
}

function evaluateFile(filename) {
  const mostCommonBits = findCommonBits(splitByLines(readFile(filename)));
  const values = bitsToValues(mostCommonBits);
  console.log("Evaluated:", filename);
  console.log("Computed:", values);
  return values;
}

// [TEST_INPUT, PUZZLE_INPUT].forEach((f) => evaluateFile(f));
// console.log("expect power 198:", evaluateFile(TEST_INPUT)); // expect 198

// PART TWO

const oxygenTernary = (bitBalance) => (bitBalance >= 0 ? 1 : 0);
function oxygenKeepBit(array, i) {
  return singleBitBalance(array, i) >= 0 ? 1 : 0;
}

const scrubberTernary = (bitBalance) => (bitBalance >= 0 ? 0 : 1);
// function scrubberKeepBit(array, i) {
//   return singleBitBalance(array, i) >= 0 ? 0 : 1;
// }
function testScrubber(fun) {}

// FIXME: not working?
function genericFilterBinaries(binaryStrings, bitFilter) {
  let workingArray = [...binaryStrings];
  for (let i = 0; i < workingArray[0].length; i++) {
    const keepBit = bitFilter(singleBitBalance(binaryStrings, i)).toString();
    workingArray = workingArray.filter((line) => line[i] === keepBit);
    if (workingArray.length === 1) break;
  }
  console.log(workingArray);
  const rating = parseInt(workingArray[0], 2);
  return rating;
}

/**
 *
 * @param {Array<string>} binaryStrings
 */
function calcOxygen(binaryStrings) {
  let workingArray = [...binaryStrings];
  for (let i = 0; i < workingArray[0].length; i++) {
    const commonBits = findCommonBits(workingArray, 1);
    workingArray = workingArray.filter(
      (line) => line[i] === commonBits[i].toString()
    );
    if (workingArray.length === 1) break;
  }
  console.log(workingArray);
  const oxygenRating = parseInt(workingArray[0], 2);
  return oxygenRating;
}

function calcScrubber(binaryStrings) {
  let workingArray = [...binaryStrings];
  for (let i = 0; i < workingArray[0].length; i++) {
    // least common, if tied keep 0
    // findCommonBits gives us the bits we don't want in this case
    // in a tie, we keep 0, so the unwanted bit is 1
    // TODO: clarify param 1 and/or 1 - v
    const uncommonBits = findCommonBits(workingArray, 1).map((v) => 1 - v);
    workingArray = workingArray.filter(
      // TODO: just do !== commonBits with no conversion via map?
      (line) => line[i] === uncommonBits[i].toString()
    );
    if (workingArray.length === 1) break;
  }
  console.log(workingArray);
  const scrubberRating = parseInt(workingArray[0], 2);
  return scrubberRating;
}

function partTwoEvaluateFile(filename) {
  const binaryStrings = splitByLines(readFile(filename));
  const oxygenRating = calcOxygen(binaryStrings);
  // FIXME: generic version not working
  // const oxygenRating = genericFilterBinaries(binaryStrings, oxygenTernary);
  const scrubberRating = calcScrubber(binaryStrings);
  // const scrubberRating = genericFilterBinaries(binaryStrings, scrubberTernary);
  const lifeRating = oxygenRating * scrubberRating;
  console.log("Evaluated:", filename);
  console.log("Computed:", lifeRating);
  return lifeRating;
}

[TEST_INPUT, PUZZLE_INPUT].forEach((f) => partTwoEvaluateFile(f));
[TEST_INPUT].forEach((f) => partTwoEvaluateFile(f));

// TEST expect oxygen: 10111 (23), scrubber: 01010 (10), life support: 230
// 3379326
