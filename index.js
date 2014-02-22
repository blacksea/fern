// FERN


var through = require('through')


module.exports = function Fern (tree, opts) {
  var USETYPE = false
  var KEYPARSE = false

  if (typeof tree !== 'object') {
    for (branch in tree) {
      if (tree[branch] instanceof Function === false)
        throw new Error('Fern: ')
        if(tree[branch].length < 1) throw new Error('Fern: function '+branch+' needs at least one arg')
    }
  }

  // objects need key:string sep:string pos:number or d.type
  if (opts && typeof opts == 'object' && typeof opts.key == 'string' ) {
    if (typeof opts.sep == 'string' && typeof opts.pos == 'number') KEYPARSE = true
  } else if (opts && typeof opts !== 'object' && !opts.key) {
    throw new Error('Fern: weird opts: \n'+opts+'\n should be {key:} or {key:,sep:,pos:}')
  } else {
    USETYPE = true
  }


  var s = through(function handleData (d) {
    var self = this
    var fn

    if (typeof d === 'object') {
      if (USETYPE === true) {
        d.type ? fn = d.type : self.emit('error', new Error('Fern: write to fern should be {type:}\n"type" should match fn name in fn tree'))
      } else if (d[opts.key]) {
        KEYPARSE === true ? fn = d[opts.key].split(opts.sep)[opts.pos] : fn = d[opts.key]
      } else if (!d[opts.key]) {
        self.emit('error', new Error('Fern: unable to match custom key: '+opts.key))
      }
    } else {
      self.emit('error', new Error('Fern: unsupported data type : '+typeof d))
    }

    if (fn && tree[fn]) {
      tree[fn].length === 2 ? tree[fn](d, self.queue) : tree[fn](d)
    } else {
      var e = 'Fern: no function '+fn+' should be one of: \n'
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
