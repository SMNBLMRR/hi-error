const hi = require("../index")();
const tap = require('tap');

tap.test('should throw an error', (t) => {
  t.plan(1);
  t.throws(() => {
    hi.CreateError(100,"Exception");
  }, {
    message: '100 is an incorrect status code'
  });
});

tap.test('should throw an error', (t) => {
    t.plan(1);
    t.throws(() => {
      hi.CreateError(400,"Exception");
    }, {
      message: 'Exception'
    });
});


