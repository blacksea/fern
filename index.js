var through = require('through')

module.exports = Fern

function Fern (opts) {

  // good options handling

  var res = {}

  var s = through(function write (chunk) {
    var self = this
    
    // filter if its an array & matches with tree
    if (chunk instanceof Array && opts.tree[chunk[0]]) {
      var d = chunk
      var cmd = d[0]
      var param = d[1]
      if (d[2]) var resKey = d[2]

      opts.tree[cmd](param, function handleResult (val) {
        if (resKey) res[resKey] = val
        if (!resKey) res.res = val
        if (opts.output && opts.output = 'json') self.emit('data',JSON.stringify(res))
        if (!opts.output) self.emit('data',val)
      })
    } else {
      // ignore
      s.emit('data',chunk)
    }
  }, function end () {
    this.emit('end')
  },{
    autoDestroy:false
  })

  return s
}
