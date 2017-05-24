var assert = require('chai').assert;

import {Variables} from './Variables';

describe('Variables', function() {

  describe('_addField - 1 field ', function() {
    let obj = {};
    obj = Variables.addField( obj, 'test', 123 );
    
    it('Variables:_addField  |-| parse key with 1 element', function() {
      assert.deepEqual(obj, { test : 123} ); // with optional message
    });
  });

  describe('_addField - multiple fields ', function() {
    let obj = {};
    obj = Variables.addField( obj, 'test.second.third', 123 );

    it('Variables:_addField  |-| parse key with 3 element', function() {
      assert.deepEqual(obj, { test : { second: { third: 123 } } } ); // with optional message
    });
  });
});