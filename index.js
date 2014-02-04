var through = require('through')

// chaining / linking / transforms

module.exports = function Fern (api) {
  // use object index to match api
  var s = through(function write (chunk) {
    // data should be an object if its a string try and parse it
    if (typeof chunk == 'string') var d = json.parse(chunk)
    // use instanceof? 
    if (!chunk.i) this.emit('error', 'please attach an index property') 
    if (chunk.i) {
      var index = chunk.i 
      delete chunk.i
    }
    if (api[index]) api[index](chunk, function handleRes (d) {
      d.i = index
      s.emit('data',d)
    })
  }, function end () {
    this.end()
  }, {autoDestroy:false})

  return s
}
