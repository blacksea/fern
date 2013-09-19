var Stream = require('stream').Stream
var inherits = require('inherits')

inherits(Fern,Stream)

module.exports = Fern

function Fern (opts) {
  if (!opts.key && !opts.tree) console.error('Fern needs an options object in the format: {key:String,tree:Object}')
  Stream.call(this) 
  this.readable = true
  this.writable = true
  var self = this  
  
  this.write = function (chunk) {
    if (typeof chunk === 'string') var d = JSON.parse(chunk)
    if (typeof chunk !== 'string') console.error('not a STRING')
    if (d instanceof Object && d[opts.key]) {
      var a = d[opts.key]
      var cmd = a[0]
      var param = a[1]
      var cb = a[2]
      opts.tree[cmd](param, function handleResult (val) {
        self.emit('data',JSON.stringify({res:val,fn: cmd}))
      })
    } else {
      console.error('no match!')
      self.emit('data',chunk)
    } 
  } 
  this.end = function () {} 
} 
