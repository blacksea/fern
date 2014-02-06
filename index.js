var through = require('through')

module.exports = function Fern (tree) {
  // make sure tree is valid
  if (typeof tree !== 'object' && !tree.put && !tree.del) 
    throw new Error('please pass a fn tree with put & del properties')

  var s = through(function handleData (d) {// should be incoming leveldb livestream

    if (d.key && d.value && d.type) {
      var path = d.key.split(':')
      var fn = path[0] // check fn for callback
      tree[d.type][fn](d, function (e, res) {
        if (e) s.emit('error', e)
        if (!e) s.emit('data', res)
      })
    } else 
      this.emit('error', new Error(d + ' : input should be leveldb livestream obj like: {key: string,value: json, type:string}'));
  }, function end () {
    this.emit('end')
  }, {autoDestroy:false})

  return s
}
