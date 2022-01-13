"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const {
  FILES,
  minAndMax,
  checkCost,
  searchPositions,
  partOne,
  partTwo,
} = require("./solution");

describe("partOne", () => {
  test("example file", () => {
    expect(partOne(FILES.example)).toEqual(37);
  });
  test("puzzle file", () => {
    expect(partOne(FILES.input)).toEqual(344535);
  });
});

describe("partTwo", () => {
  test("example file", () => {
    expect(partTwo(FILES.example)).toEqual(168);
  });
  test("puzzle file", () => {
    expect(partTwo(FILES.input)).toEqual(95581659);
  });
});
