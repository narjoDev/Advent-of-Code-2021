"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

/*
count the number of times a depth measurement increases from the previous measurement. 
(There is no measurement before the first measurement.)
How many measurements are larger than the previous measurement?
*/

const {
  readFile: readTextFile,
  splitByLines: splitStringByLines,
} = require("../libs/get-input");

const INPUT_FILE = "input.txt";

/**
 * Takes a file name and returns an array of numbers converted from the file's lines.
 * @param {string} inputFileName File name to input data from.
 * @returns {Array<Number>} Array of numbers imported from file.
 */
function importPuzzleInput(inputFileName) {
  return convertArrayToNumbers(splitStringByLines(readTextFile(inputFileName)));
}

/**
 * Returns the number of elements greater than the previous element in an array.
 * @param {Array} array Array of comparable elements.
 * @returns {number} Number of elements greater than the previous element.
 */
function countIncreasesInArray(array) {
  let increases = 0;
  let previous;
  for (let i = 0; i < array.length; i++) {
    const thisElement = array[i];
    if (thisElement > previous) increases++;
    previous = thisElement;
  }
  return increases;
}

/**
 * Returns an array with elements converted to numbers.
 * Converts only truthy elements (and 0), removing NaN.
 * @param {Array} array
 * @returns {Array<Number>} Array with truthy (and 0) elements converted to numbers.
 */
function convertArrayToNumbers(array) {
  const result = array.reduce((newArray, currentValue) => {
    if (currentValue || currentValue === 0) {
      const converted = Number(currentValue);
      if (!isNaN(converted)) newArray.push(converted);
    }
    return newArray;
  }, []);
  return result;
}

console.log(countIncreasesInArray(importPuzzleInput(INPUT_FILE)));
console.log(countIncreasesInArray(importPuzzleInput("test-from-prompt.txt")));

// Consider sums of a three-measurement sliding window.
// How many sums are larger than the previous sum?

/**
 * Compares the sums of elements in a rolling window,
 * returning the number of windows greater than the previous.
 * @param {Array} array Array of comparable elements.
 * @param {number} windowSize Size of the rolling window to compare. Defaults to 1.
 * @returns {number} Number of windows with greater sums than the previous windows.
 */
function countWindowIncrease(array, windowSize = 1) {
  let increases = 0;
  let previous = Array(windowSize);
  for (let i = 0; i < array.length; i++) {
    const thisElement = array[i];
    if (thisElement > previous.shift()) increases++;
    previous.push(thisElement);
  }
  return increases;
}

console.log(countWindowIncrease(importPuzzleInput(INPUT_FILE), 3)); // 1395
console.log(countWindowIncrease(importPuzzleInput("test-from-prompt.txt"), 3)); // 5
console.log(countWindowIncrease(importPuzzleInput("test-ad-hoc.txt"), 3)); //
