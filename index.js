// FERN


var through = require('through')


module.exports = function Fern (tree, opts) {
  var USETYPE = false
  var KEYPARSE = false

  if (typeof tree !== 'object') {
    for (branch in tree) {
      if (tree[branch] instanceof Function === false)
        throw new Error('please pass a fn tree')
        if(tree[branch].length < 1) throw new Error('Fn '+branch+' needs arg')
    }
  }

  // objects need key:string sep:string pos:number or d.type
  if (opts && typeof opts == 'object' && typeof opts.key == 'string' ) {
    if (typeof opts.sep == 'string' && typeof opts.pos == 'number') KEYPARSE = true
  } else if (opts && typeof opts !== 'object' && !opts.key) {
    throw new Error('malformed opts')
  } else {
    USETYPE = true
  }


  var s = through(function handleData (d) {
    var self = this
    var fn

    if (typeof d === 'object') {
      if (USETYPE === true) {
        d.type ? fn = d.type : self.emit('error', new Error('no opts or type'))
      } else if (d[opts.key]) {
        KEYPARSE === true ? fn = d[opts.key].split(opts.sep)[opts.pos] : fn = d[opts.key]
      } else if (!d[opts.key]) {
        self.emit('error', new Error('no key!'))
      }
    } else {
      self.emit('error', new Error('wrong input'))
    }

    if (fn && tree[fn]) {
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
