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
var cacti = fern(tree, {key:'key',sep:':',pos:0})

cacti.on('data', function (d) {
  console.log(d)
})

bush.write({
  type:'a',
  data: 3
})

cacti.write({
  key:'b:fern:blob',
  data: 10
})
