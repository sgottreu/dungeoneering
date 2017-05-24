var assert = require('chai').assert;

import {Variables} from '../lib/Variables';
import * as Entity from './Entity';

describe('Entity', function() {
  let obj = {
    points: {
      totalRacePoints: 0,
      usedPoints: 0,
      remainingPoints: 0
    },
    entity: Variables.clone(Entity.Template)
  }

  describe('calcRemainingPoints ', function() {
    it('Entity:calcRemainingPoints  |-| returns remaining points 24', function() {
      let _obj = Variables.clone(obj);
      _obj.entity.level = 10;
      let points = Entity.calcRemainingPoints(_obj.points, _obj.entity);
      assert.equal(points.remainingPoints, 22); // with optional message
    });

    it('Entity:calcRemainingPoints  |-| returns usedPoints 74', function() {
      let _obj = Variables.clone(obj);
      let target = { name: 'strength', value: 14 };
      let points = Entity.calcRemainingPoints(_obj.points, _obj.entity, target);
      assert.equal(points.usedPoints, 74); // with optional message
    });
  });
});