const { readFileSync } = require('fs');

const path = require('path');

const { is } = require('./validOptions');

function readFrom(args) {
  if (is.array) {
    try {
      switch (args.length) {
        case 1:
          return readFileSync(path.resolve('./', args[0]), 'utf-8');
        case 2:
          return readFileSync(path.resolve('./', args[0], args[1]), 'utf-8');
        default:
          return 'Incorrect path arguments';
      }
    } catch (err) {
      return 'File not found, Verify that you have entered the correct path';
    }
  } else {
    throw new Error('Invalid path arguments');
  }
}

module.exports.readFrom = readFrom;
