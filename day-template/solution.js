"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { readFile, splitByLines } = require("../libs/get-input");

const FILES = {
  example: "./day-<DAY>/example-input.txt",
  input: "./day-<DAY>/puzzle-input.txt",
};

module.exports = { FILES };
