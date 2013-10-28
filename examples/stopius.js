// create a new rule that converts any word ending
// with 'p' and appends 'ius' to the word

var plural = require('./index.js')

plural.addRule(/p{1,2}$/i, function(w) { return w + "ius" })

console.log(plural("stop"))
