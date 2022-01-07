"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { readFile, splitByLines } = require("../libs/get-input");

const FILES = {
  test: "./day-06/test-from-prompt.txt",
  input: "./day-06/input.txt",
};

// PART ONE:
// How many lanternfish would there be after 80 days?

const lineToInts = (line) => line.match(/[0-8]/g).map((v) => parseInt(v));

function convertToModel(listOfFish) {
  let school = Array(9).fill(0);
  listOfFish.forEach((fish) => {
    school[fish]++;
  });
  return school;
}

function simulateDays(school, days = 1) {
  school = [...school];
  for (let i = 0; i < days; i++) {
    const ripeFish = school.shift();
    school.push(ripeFish);
    school[6] += ripeFish;
  }
  return school;
}

const sumOfArray = (arr) => arr.reduce((a, b) => a + b);

function simulateFile(filename, days = 1) {
  const listOfFish = lineToInts(splitByLines(readFile(filename))[0]);
  const school = convertToModel(listOfFish);
  const endSchool = simulateDays(school, days);
  const numFish = sumOfArray(endSchool);
  return numFish;
}

module.exports = {
  FILES,
  lineToInts,
  convertToModel,
  simulateDays,
  simulateFile,
};
