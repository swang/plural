'use strict';

var rules = []

function type(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}

function addRule(match, result) {
  rules.unshift([match, result])
  return plural
}

// words like cherry, where a word ends in a y, but the letter before the y is a consonant
// also contains unique rule for words that end with 'quy' (soliloquy)
addRule(/[^aeiou]y$|quy$/i, function(w) { return w.substr(0, w.length - 1) + 'ies' })

// words that end with ch, x, s append 'es'
addRule(/x$|ch$|s$/i, function(w) { return w + 'es' })

// words that maintain latin/greek plural
addRule(/nucleus|syllabus|focus|fungus|cactus/i, function(w) { return w.substr(0, w.length - 2) + 'i' });
addRule(/thesis|crisis/i, function(w) { return w.substr(0, w.length - 2) + 'es' });
addRule(/appendix|index/i, function(w) { return w.substr(0, w.length - 2) + 'ices' });

// stereo -> stereos
addRule(/[aeiouy]o$/i, function(w) { return w + 's' });
addRule(/[^aeiouy]o$/i, function(w) { return w + 'es' });

// f/fe ending words gets switched to ves
// unless it's dwarf or roof
addRule(/(fe?$)/i, function(w, regex) {
  if (w === 'dwarf' || w === 'roof') {
    return w + 's'
  }
  return w.replace(regex, 'ves')
})

addRule('criterion', 'criteria')
addRule('bacterium', 'bacteria')
addRule('memo', 'memos')
addRule('cello', 'cellos')
addRule('die', 'dice')
addRule('goose', 'geese')
addRule('mouse', 'mice')
addRule('person', 'people')
addRule('chilli', 'chillies')

addRule(/^(?:wo)?man$/i, function(w) { return w.replace(/a/, 'e') })

addRule(/\b(?:bison|cod|deer|fowl|halibut|moose|sheep|kudos?|premises|shambles)\b/i, function(w) { return w })

function plural(word, num) {
  var i
    , rule

  if (num !== 1 || num === undefined) {
    for (i = 0; i < rules.length; i++) {
      rule = rules[i]

      if (type(rule[0]) === 'RegExp' && rule[0].test(word)) {
        return type(rule[1]) === 'Function' ? rule[1](word, rule[0]) : rule[1]
      }
      if (type(rule[0]) === 'String' && rule[0] === word) {
        return type(rule[1]) === 'Function' ? rule[1](word) : rule[1]
      }

    }

    return word + 's'
  }
  return word
}

module.exports = plural

module.exports.addRule = addRule

module.exports.unmonkeyPatch = function() {
  String.prototype.plural = null;
}

module.exports.monkeyPatch = function() {
  if (String.prototype.plural === undefined) {
    String.prototype.plural = function(num) {
      return plural(this, num)
    }
  }
  else {
    throw new Error('Unable to add plural function to String object')
  }
}

module.exports.VERSION = require('./package.json').version
