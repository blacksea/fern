var through = require('through')

module.exports = Fern

function Fern (opts) {
  if (!opts && !opts.tree) throw new Error('Fern needs an options object in the format: {key:String,tree:Object}')
  // make opts.key optional, if not specified just try to match tree.method

  var s = through(function write (chunk) {
    var self = this
    var d = JSON.parse(chunk) // todo: ignore if buffer
    if (d instanceof Object && d[opts.key]) {
      var a = d[opts.key]
      var cmd = a[0]
      var param = a[1]
      var cb = a[2]
      if (!opts.tree[cmd]) console.error('no such command!')
      if (opts.tree[cmd]) {
        opts.tree[cmd](param, function handleResult (val) {
          self.emit('data',JSON.stringify({res:val}))
        })
      }
    }
    if (d instanceof Array && !d[opts.key]) {
      var cmd = d[0]
      var param = d[1]
      if (!opts.tree[cmd]) console.error('no such command!')
      if (opts.tree[cmd]) {
        opts.tree[cmd](param, function handleResult (val) {
          self.emit('data',JSON.stringify({res:val}))
        })
      }
    }
    if (!d[opts.key] && !(d instanceof Array)) {
      self.emit('data', chunk)
    }
  }, function end () {
    this.emit('end')
  })

  return s
}
