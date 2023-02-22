"use strict";
const Ajv = require("ajv");
const ajv = new Ajv({ allErrors: true });
const { isValidOptions, Exception } = require("./lib/validOptions");

const schema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      tag: { type: "string" },
      error: {
        type: "object",
        properties: {
          code: { type: "integer" },
          message: { type: "string" },
        },
        required: ["code", "message"],
        additionalProperties: false,
      },
    },
    required: ["tag", "error"],
    additionalProperties: false,
  },
};

class CustomException extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function CreateError(status, message) {
  if (!(this instanceof CustomException)) return new CustomException(status, message);
}

function CustomHttpError(opt) {
  const { isValid, json } = isValidOptions(opt);
  const parseJson = JSON.parse(json);
  const validate = ajv.compile(schema);
  const isCorrectSchema = validate(parseJson);
  if (!isCorrectSchema) {
    Exception("Invalid Schema");
  }
  const httpErrorObject = {};
  if (isValid && isCorrectSchema) {
    httpErrorObject["CreateError"] = CreateError;
    for (const ele of parseJson) {
      httpErrorObject[ele.tag] = CreateError(ele.error.code, ele.error.message);
    }
    return httpErrorObject;
  }
}

module.exports = CustomHttpError;