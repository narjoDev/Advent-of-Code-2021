"use strict";
/* jshint 
esversion: 11,
devel: true,
node: true,
-W097 
*/

// TODO: ONRAMP: add file reader function(s) to common library

const fs = require("fs");

function readTextFile(filename, encoding = "utf8") {
  try {
    const data = fs.readFileSync(filename, encoding);
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

function parseCommand(line) {
  const commandPattern = /^(?<direction>forward|down|up) (?<distance>\d+)$/;
  const match = line.match(commandPattern);
  const defaults = { direction: undefined, distance: undefined };
  const { direction, distance } = match?.groups || defaults;
  return [direction, distance];
}

function tallyPosition(commands) {
  let horizontal = 0;
  let depth = 0;
  commands.forEach((c) => {
    const direction = c[0];
    const distance = parseInt(c[1]);
    switch (direction) {
      case "forward":
        horizontal += distance;
        break;
      case "down":
        depth += distance;
        break;
      case "up":
        depth -= distance;
        break;
    }
  });
  return [horizontal, depth];
}

function evaluateFile(filename) {
  const lines = splitStringByLines(readTextFile(filename));
  const commands = lines.map((l) => parseCommand(l));
  const positions = tallyPosition(commands);
  const product = positions[0] * positions[1];
  console.log("Evaluated:", filename);
  console.log("Computed:", product);
  return product;
}

evaluateFile("test-from-prompt.txt");
evaluateFile("input.txt");
