var run = require('./index.js') // req fern lib

function a (param, cb) {

}

function b (param, cb) {

}

function c (param, cb) {

}

fern([
  [a, 'test']
  , b
  , c
], function () {
  console.log('done')
})
