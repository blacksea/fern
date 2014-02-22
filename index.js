// FERN


var through = require('through')


module.exports = function Fern (tree, opts) {

  if (typeof tree !== 'object') {
    for (branch in tree) {
      if (tree[branch] instanceof Function === false)
        throw new Error('please pass a fn tree')
    }
  }

  var s = through(function handleData (d) {
    var self = this
    var fn

    // determin fn
    if (!opts && d.type) fn = d.type

    if (opts) {
      (opts.key && !opts.sep && !opts.pos) ? fn = d[opts.key] : fn = d[opts.key].split(opts.sep)[opts.pos]
    }

    if (tree[fn]) {
      tree[fn].length === 2 ? tree[fn](d, self.queue) : tree[fn](d)
    } else {
      var e = 'Use one of these d.types to call fn in tree:\n'
      for (branch in tree) {
        e += branch + '\n'
      }
      this.emit('data', d)
      this.emit('error', new Error(e))
    }
  }, function end () {
    this.emit('end')
  })

  s.autoDestroy = false

  return s
}
