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

/**
 * Accepts an array of string representations of binary numbers,
 * returning an array of numbers representing the most common bits in the input array.
 *
 * @param {Array<String>} binaryStrings array of equal length strings representing binary numbers
 * @returns {Array<Number>}
 */
function findCommonBits(binaryStrings) {
  // Track surplus of 1 over 0 for each digit
  let bitBalance = Array(binaryStrings[0].length).fill(0);

  binaryStrings.forEach((binary) => {
    for (let i = 0; i < binary.length; i++) {
      bitBalance[i] += binary[i] === "1" ? 1 : -1;
    }
  });

  const mostCommonBits = bitBalance.map((v) => (v < 0 ? 0 : 1));
  return mostCommonBits;
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

[TEST_INPUT, PUZZLE_INPUT].forEach((f) => evaluateFile(f));
console.log("expect power 198:", evaluateFile(TEST_INPUT)); // expect 198
