const tap = require('tap');

const hi = require('../index')();

tap.test('should throw an error', (t) => {
  t.plan(1);
  t.throws(() => {
    hi.CreateError(100, 'Exception');
  }, {
    message: '100 is an incorrect status code',
  });
});

tap.test('should throw an error with custom message', (t) => {
  t.plan(1);
  t.throws(() => {
    hi.CreateError(400, 'Exception');
  }, {
    message: 'Exception',
  });
});

tap.test('default status code with message', (t) => {
  t.plan(1);
  t.throws(() => {
    hi.CreateError('Exception');
  }, {
    message: 'Exception',
  });
});
