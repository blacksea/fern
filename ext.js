var test = require('tape');

function m () {
  this.foo = function (n) {
    return n*11
  }
  this.beep = function (cb) {
    cb('boop')
  }
}

test('fibwibblers and xyrscawlers', function (t) {
    t.plan(2);

    var x = new m;
    t.equal(x.foo(2), 22);

    x.beep(function (err, res) {
        t.equal(res, 'boop');
    });
})
