var test = require('tape')
var fern = require('./index.js')

// TREES TO TEST
var fakeTree = 'I am a string not a tree!'

var badTree = {
  string: 'not a function',
  ugFun: function () {
    // function without any params!
  }
}

var goodTree = {
  add: function (d, emit) {

  },
  subtract: function (d, emit) {
  },
  log: function (d) {
    console.log(d)
  }
}

// TESTS
test('Making yourself a new Fern', function (t) {
  // test that fern returns stream given correct input

  // test with wrong tree input
  var stinkWeed = fern(badTree)
  var vinylFern = fern(fakeTree)

  // test with normal d.type obj
  var shrub = fern(goodTree)

  // test with wrong opts
  var weed = fern(goodTree, {clump:'fake opt', moss: ['not correct input', 4]})

  // test with correct tree opts and correct tree input
  var bush = fern(goodTree, {key:'branch', sep:':', pos:1})

  // test with correct opts & correct input & different pos selection
  var hedge = fern(goodTree, {key:'branch', sep:':', pos:0})
})

test('Using your Fern', function (t) {

// test bad data input
//   not an object
//   bad key
//   bad sep
//   bad pos

// test good data input
// test fn call
//   with cb
//   without cb

})



