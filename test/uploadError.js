const tap = require('tap');
const { readFrom } = require('../lib/readFrom');

tap.test("file not found", t => {
    t.plan(1);
    t.throws(() => {
        readFrom("example.json");        
    }, {
        message:"Invalid path arguments"
    })
})