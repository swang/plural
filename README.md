# plural
Plural is a rule-based plural library for node.js

[![Build Status](https://travis-ci.org/swang/plural.png?branch=master)](https://travis-ci.org/swang/plural)

# install

```
npm install plural
```

# example

```js
var plural = require('plural')

console.log(plural('zebra', 1)) // returns singular 'zebra'
console.log(plural('zebra', 2)) // returns 'zebras'
console.log(plural('zebra')) // returns 'zebras' (if no parameters, always returns plural)
```

```
zebra
zebras
zebras
```

you can also force it to monkeypatch onto the String prototype
```js
var plural = require('plural')
plural.monkeyPatch()

console.log('zebra'.plural(1))
console.log('zebra'.plural(2))
console.log('zebra'.plural())
```

```
zebra
zebras
zebras
```

you can remove it from the String prototype by using `plural.unmonkeyPatch()`

# license
MIT
