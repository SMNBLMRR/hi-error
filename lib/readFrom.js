"use strict";

const { readFileSync } = require("fs");
const path = require("path");

function readFrom(args) {
  try {
    switch (args.length) {
      case 1:
        return readFileSync(path.resolve("./", args[0]), "utf-8");
      case 2:
        return readFileSync(path.resolve("./", args[0], args[1]), "utf-8");
      default:
        return "Incorrect path arguments";
    }
  } catch (err) {
    return "File not found, Verify that you have entered the correct path";
  }
}

module.exports.readFrom = readFrom;
