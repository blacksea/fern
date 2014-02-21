// FERN

var through = require('through')

module.exports = function Fern (tree) {

  if (typeof tree !== 'object') {
    for (branch in tree) {
      if (tree[branch] instanceof Function === false)
        throw new Error('please pass a fn tree')
    }
  }

  var s = through(function handleData (d) {
    var self = this

    if (d.type && tree[d.type]) {
      var fn = tree[d.type]
      fn.length === 2 ? fn(d, self.queue) : fn(d)
    } else {
      var e = 'no such fn in tree'
      this.emit('error', new Error(e))
    }
  }, function end () {
    this.emit('end')
  })

  s.autoDestroy = false

  return s
}
