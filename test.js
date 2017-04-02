'use strict';
/* global it: false, describe: false */

var plural = require('./index')
  , assert = require('assert')

describe('test monkey patching', function() {
  describe('removing monkey patching (unmonkeyPatch)', function() {
    it('should work as intended', function() {
      plural.monkeyPatch()
      assert.doesNotThrow(function() { String('test').plural() }, 'plural should be monkeypatched into String')
      plural.unmonkeyPatch()
      assert.throws(function() { String('test').plural() }, TypeError, 'plural should not be monkeypatched into String')
    })
  })
})

describe('plurals match', function() {
  it('should match plurals', function() {
    assert.equal(plural('test'), 'tests')
    assert.equal(plural('hero'), 'heroes')
    assert.equal(plural('embryo'), 'embryos')
    assert.equal(plural('zero'), 'zeroes')
    assert.equal(plural('cherry'), 'cherries')
    assert.equal(plural('sky'), 'skies')
    assert.equal(plural('seaway'), 'seaways')
    assert.equal(plural('soliloquy'), 'soliloquies')
    assert.equal(plural('monkey'), 'monkeys')
    assert.equal(plural('day'), 'days')
    assert.equal(plural('witch'), 'witches')
    assert.equal(plural('box'), 'boxes')
    assert.equal(plural('gallery'), 'galleries')
    assert.equal(plural('stereo'), 'stereos')
    assert.equal(plural('memo'), 'memos')
    assert.equal(plural('hero'), 'heroes')
    assert.equal(plural('omen'), 'omens')
    assert.equal(plural('chilli'), 'chillies')
  })

  it('should match greek/latin plurals', function() {
    assert.equal(plural('nucleus'), 'nuclei')
    assert.equal(plural('syllabus'), 'syllabi')
    assert.equal(plural('focus'), 'foci')
    assert.equal(plural('fungus'), 'fungi')
    assert.equal(plural('cactus'), 'cacti')

    assert.equal(plural('thesis'), 'theses')
    assert.equal(plural('crisis'), 'crises')

    assert.equal(plural('appendix'), 'appendices')
    assert.equal(plural('index'), 'indices')

    assert.equal(plural('criterion'), 'criteria')
  })

  it('should convert f/fe ending words to "ves"', function() {
    assert.equal(plural('knife'), 'knives')
    assert.equal(plural('leaf'), 'leaves')
    assert.equal(plural('hoof'), 'hooves')
    assert.equal(plural('life'), 'lives')
    assert.equal(plural('self'), 'selves')
    assert.equal(plural('elf'), 'elves')
  })

  it('should handle man/woman/human', function() {
    assert.equal(plural('man'), 'men')
    assert.equal(plural('woman'), 'women')
    assert.notEqual(plural('oman'), 'omen')
    assert.equal(plural('human'), 'humans')
  })

  it('should handle words that are the same both singular/plural', function() {
    assert.equal(plural('bison'), 'bison')
    assert.equal(plural('cod'), 'cod')
    assert.equal(plural('deer'), 'deer')
    assert.equal(plural('fowl'), 'fowl')
    assert.equal(plural('halibut'), 'halibut')
    assert.equal(plural('moose'), 'moose')
    assert.equal(plural('sheep'), 'sheep')
    assert.equal(plural('kudos'), 'kudos')
    assert.equal(plural('premises'), 'premises')
    assert.equal(plural('shambles'), 'shambles')
  })

  it('should not flag anything that starts with those above words', function() {
    assert.equal(plural('zipcode'), 'zipcodes')
    assert.equal(plural('afowl'), 'afowls')
    assert.equal(plural('moosed'), 'mooseds')
  })

  it('should handle some unique plurals', function() {
    assert.equal(plural('die'), 'dice')
    assert.equal(plural('goose'), 'geese')
    assert.equal(plural('mouse'), 'mice')
    assert.equal(plural('person'), 'people')
  })

  it('should make sure addRule works', function() {
    assert.notEqual(plural('zzz'), 'roh')

    plural.addRule('zzz', 'yyy')

    assert.equal(plural('zzz'), 'yyy')
  })

  it('should be case insensitive', function() {
    assert.equal(plural('test'), 'tests')
    assert.equal(plural('Test'), 'Tests')
    assert.equal(plural('TesT'), 'TesTs')
    assert.equal(plural('pennY'), 'pennies')
    assert.equal(plural('PeNnY'), 'PeNnies')
    assert.equal(plural('KudoS'), 'KudoS')
  })
})

describe('addRule should return plural construct', function() {
  it('should be equal', function() {
    assert.equal(plural.addRule(/garababble/i, function(w) { return w }), plural)
  })
})
