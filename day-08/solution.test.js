"use strict";
/* jshint 
esversion: 6,
devel: true,
node: true,
-W097 
*/

const { test, expect, describe } = require("@jest/globals");
const { FILES } = require("./solution");

describe("FOO", () => {
  test("BAR", () => {
    expect(true).toEqual(true);
  });
});
