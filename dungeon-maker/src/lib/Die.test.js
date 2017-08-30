var assert = require('chai').assert;

import {Die} from './Die';

describe('Die', function() {
  describe('getRandomRoll ', function() {
    it('Die:getRandomRoll  |-| returns random number', function() {
      var rnd = Die.getRandomRoll();
      assert.isAtMost(rnd, 1, 'Random is less = 1'); // with optional message
    });
  });

  describe('dieRoll ', function() {
    it('Die:dieRoll  |-| random < 20', function() {
      var rnd = Die.dieRoll(20);
      assert.isAtMost(rnd, 20, 'Random < 20'); // with optional message
    });
    it('Die:dieRoll  |-| returns 10', function() {
      var rnd = Die.dieRoll(20, [.1,.3,.5,.7,.9]);
      assert.equal(rnd, 10, 'Random* equals 10'); // with optional message
    });
  });

  describe('findMedian ', function() {
    it('Die:findMedian  |-| Odd number array', function() {
      var mdn = Die.findMedian([1,3,5,7,9]);
      assert.equal(mdn, 5, 'Odd number array'); // with optional message
    });
    it('Die:findMedian  |-| Even number array', function() {
      var mdn = Die.findMedian([3,5,7,9]);
      assert.equal(mdn, 6, 'Even number array'); // with optional message
    });
  });
});