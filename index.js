const Ajv = require('ajv');

const ajv = new Ajv({ allErrors: true });

const { isValidOptions, Exception, is } = require('./lib/validOptions');

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      tag: { type: 'string' },
      error: {
        type: 'object',
        properties: {
          code: { type: 'integer' },
          message: { type: 'string' },
        },
        required: ['code', 'message'],
        additionalProperties: false,
      },
    },
    required: ['tag', 'error'],
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
  if (!(is.validCode(status) && this instanceof CustomException)) {
    throw new CustomException(status, message);
  }
}

function CustomHttpError(opt) {
  const { json } = isValidOptions(opt);
  let parseJson = null;
  if (is.object(opt)) {
    parseJson = JSON.parse(json);
    const validate = ajv.compile(schema);
    const isCorrectSchema = validate(parseJson);
    if (!isCorrectSchema) {
      Exception('Invalid Schema');
    }
  }
  const httpErrorObject = {};
  httpErrorObject.CreateError = CreateError;
  if (parseJson) {
    // eslint-disable-next-line no-restricted-syntax
    for (const ele of parseJson) {
      if (is.validCode(ele.error.code)) {
        httpErrorObject[ele.tag] = CreateError(ele.error.code, ele.error.message);
      }
    }
  }
  return httpErrorObject;
}

module.exports = CustomHttpError;
