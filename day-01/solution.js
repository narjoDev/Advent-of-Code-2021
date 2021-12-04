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

const fs = require("fs");

const INPUT_FILE = "input.txt";

function readTextFile(fileName, encoding = "utf8") {
  try {
    const data = fs.readFileSync(fileName, encoding);
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function splitStringByLines(string) {
  const lineEndPattern = /\r?\n/;
  return string.split(lineEndPattern);
}

function importPuzzleInput(inputFileName) {
  return convertArrayToNumbers(splitStringByLines(readTextFile(inputFileName)));
}

/**
 * Returns the number of elements greater than the previous element in an array
 * @param {Array} array
 * @returns {number} Number of elements greater than the previous element
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
 * @returns {Array<Number>} Array with truthy (and 0) elements converted to numbers
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
