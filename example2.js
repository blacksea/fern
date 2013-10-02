var fern = require('./index.js')
var through = require('through')

setInterval(function () {
  rs.write(['xTwo',Math.random(),'xox'])
}, 10)

var rs = through(function write (chunk) {
  this.emit('data',chunk)
}, function end () {
  this.emit('end')
})

var tree = {
  xTwo : function (input,output) {
    output(input*2)
  },
  xFour : function (input,output) {
    output(input*4)
  }
}

var f = new fern({tree:tree})

rs.pipe(f).pipe(process.stdout)
