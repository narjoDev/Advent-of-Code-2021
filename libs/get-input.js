"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

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

module.exports = { readFile, splitByLines };
