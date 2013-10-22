var plural = require("./index")
  , assert = require('assert')

describe('test monkey patching', function() {
  describe('removing monkey patching', function() {
    it('should not work', function() {
      plural.unmonkeyPatch()
      assert.throws(function() { new String("test").plural() }, TypeError, "plural should not be monkeypatched into String")
      plural.monkeyPatch()
      assert.doesNotThrow(function() { new String("test").plural() }, "plural should be monkeypatched into String")
    })
  })
  describe('plurals match', function() {
    it('should match plurals', function() {
      assert.equal("test".plural(), "tests")
      assert.equal("hero".plural(), "heroes")
      assert.equal("embryo".plural(), "embryos")
      assert.equal("zero".plural(), "zeroes")
      assert.equal("cherry".plural(), "cherries")
      assert.equal("sky".plural(), "skies")
      assert.equal("seaway".plural(), "seaways")
      assert.equal("soliloquy".plural(), "soliloquies")
      assert.equal("monkey".plural(), "monkeys")
      assert.equal("day".plural(), "days")
      assert.equal("witch".plural(), "witches")
      assert.equal("box".plural(), "boxes")
      assert.equal("gallery".plural(), "galleries")
      assert.equal("stereo".plural(), "stereos")
      assert.equal("memo".plural(), "memos")
      assert.equal("hero".plural(), "heroes")
      assert.equal("omen".plural(), "omens")
    })

    it('should match greek/latin plurals', function() {
      assert.equal("nucleus".plural(), "nuclei")
      assert.equal("syllabus".plural(), "syllabi")
      assert.equal("focus".plural(), "foci")
      assert.equal("fungus".plural(), "fungi")
      assert.equal("cactus".plural(), "cacti")

      assert.equal("thesis".plural(), "theses")
      assert.equal("crisis".plural(), "crises")

      assert.equal("appendix".plural(), "appendices")
      assert.equal("index".plural(), "indices")

      assert.equal("criterion".plural(), "criteria")
    })

    it('should convert f/fe ending words to "ves"', function() {
      assert.equal("knife".plural(), "knives")
      assert.equal("leaf".plural(), "leaves")
      assert.equal("hoof".plural(), "hooves")
      assert.equal("life".plural(), "lives")
      assert.equal("self".plural(), "selves")
      assert.equal("elf".plural(), "elves")
    })

    it('should handle man/woman/human', function() {
      assert.equal("man".plural(), "men")
      assert.equal("woman".plural(), "women")
      assert.notEqual("oman".plural(), "omen")
      assert.equal("human".plural(), "humans")
    })

    it('should handle words that are the same both singular/plural', function() {
      assert.equal("bison".plural(), "bison")
      assert.equal("cod".plural(), "cod")
      assert.equal("deer".plural(), "deer")
      assert.equal("fowl".plural(), "fowl")
      assert.equal("halibut".plural(), "halibut")
      assert.equal("moose".plural(), "moose")
      assert.equal("sheep".plural(), "sheep")
      assert.equal("kudos".plural(), "kudos")
      assert.equal("premises".plural(), "premises")
      assert.equal("shambles".plural(), "shambles")
    })

    it('should handle some unique plurals', function() {
      assert.equal("die".plural(), "dice")
      assert.equal("goose".plural(), "geese")
      assert.equal("mouse".plural(), "mice")
      assert.equal("person".plural(), "people")
    })

    it('should make sure addRule works', function() {
      assert.notEqual("zzz".plural(), "roh")
      
      plural.addRule("zzz", "yyy")
      
      assert.equal("zzz".plural(), "yyy")
    })
  })
})
