var plural = require('./index.js')
  , monkeyPatch = plural.monkeyPatch()

plural.addRule(/p{1,2}$/i, function(w) { return w + "ius" })

console.log("stop".plural())
