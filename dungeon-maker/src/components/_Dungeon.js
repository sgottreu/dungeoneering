import axios from 'axios';
import {Variables} from './Variables';

class _Dungeon {};

_Dungeon.findDungeonGrids = function(_this) {
    axios.get(`${Variables.host}/findDungeonGrids`)
    .then(res => {
      let state = _this.state;
      state.foundDungeonGrids = res.data;
      state.foundDungeonGrids.sort(function(a, b) {
        var nameA = a.title.toUpperCase(), nameB = b.title.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        } else {
          if (nameA > nameB) {
            return 1;
          } else {
            return 0;
          }
        }
      });

      _this.setState( state );
    });
}

_Dungeon.setCurrentActor = (state, roll, slot) => {
  if(!state.currentActor.roll || state.currentActor.roll <= roll){
    state.currentActor = {slot: slot, roll: roll};
  }
  return state;
}

_Dungeon.rollInitiative = function(_this){
  let state = _this.state;
  state.currentActor = {slot: false, roll: false};

  state.slots.map((slot, x) => {
    if(slot.occupied){
      let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + slot.overlays.entity.initiative.total;
      slot.overlays.entity.initiative.current = roll;

      state = this.setCurrentActor(state, roll, x+1);
    }
    return slot;
  });

  _this.setState( state );
}

export {_Dungeon};