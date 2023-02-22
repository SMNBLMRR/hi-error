"use strict";
const { readFrom } = require("./readFrom");
const is = {
  array: (args) => Array.isArray(args),
  object: (args) => typeof args === "object",
  validCode: (code) => (isNaN(code) || code < 400 || code > 599 ? Exception(code) : true),
};

function isValidOptions(options) {
  let isValid = false;
  let json = null;
  if (is.object(options)) {
    if (options["path"] && is.array(options["path"])) {
        json = readFrom(options["path"])
        isValid = true;
    }
  }
  return { json, isValid };
}

function Exception(args) {
  if (typeof args === "number") throw new Error(`${args} is an incorrect status code`);
  if (typeof args === "string") throw new Error(args);
}

module.exports.isValidOptions = isValidOptions;
module.exports.Exception = Exception;
