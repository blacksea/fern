var tape = require('tape')
var fern = require('./fern.js')

var api = fern({
  one: function (o,out) {
    o.body += '_POW'
    out(o)
  },
  two: function (o,out) {
    o.ar=[0,1,2,3,4,5,6,7,8,9]
    out(o)
  },
  three: function (o,out) {
    o.a.push(1)
    o.a.push(2)
    o.a.push(3)
    out(o)
  }
})

api.on('data', function (d) {
  console.log(d)
})

var a = {
  i:'one',
  body:'a message body'
}

var b = {i:'two'}

var c = {
  i:'three',
  a:[] 
}

api.write(a)
api.write(b)
api.write(c)
