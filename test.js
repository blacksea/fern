//var tap = require('tap')
var fern = require('./index.js')

var tree = {
  a : function (d) {
    console.log(d)
  },
  b : function (d, cb) {
    d.data = d.data * 5
    cb(d)
  }
}

var bush = fern(tree)

bush.on('data', function (d) {
  console.log(d)
})

bush.write({
  type:'a',
  data: 3
})

bush.write({
  type:'b',
  data: 10
})
