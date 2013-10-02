var through = require('through')

module.exports = Fern

function Fern (opts) {
  if (!opts && !opts.tree) throw new Error('Fern needs an options object in the format: {key:String,tree:Object}')
  // make opts.key optional, if not specified just try to match tree.method

  var s = through(function write (chunk) {
    var self = this
    var res = {}
    if (!(chunk instanceof Array)) var d = JSON.parse(chunk) // todo: ignore if buffer
    if (d && d instanceof Object && d[opts.key]) {
      var a = d[opts.key]
      var cmd = a[0]
      if (!opts.tree[cmd]) console.error('no such command!')
      var param = a[1]
      if (a[2]) var resKey = a[2]
      opts.tree[cmd](param, function handleResult (val) {
        if (resKey) res[resKey] = val
        if (!resKey) res.res = val
        self.emit('data',JSON.stringify(res))
      })
    }
    if (!d && chunk instanceof Array) {
      var d = chunk
      var cmd = d[0]
      if (!opts.tree[cmd]) console.error('no such command!')
      var param = d[1]
      if (d[2]) var resKey = d[2]
      opts.tree[cmd](param, function handleResult (val) {
        if (resKey) res[resKey] = val
        if (!resKey) res.res = val
        self.emit('data',JSON.stringify(res))
      })
    }
    if (d && !d[opts.key] && !(d instanceof Array)) {
      self.emit('data', chunk)
    }
  }, function end () {
    this.emit('end')
  },{
    autoDestroy:false
  })

  return s
}
