import axios from 'axios';
import {Variables} from './Variables';
import uuidV4  from 'uuid/v4';

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

_Dungeon.rollInitiative = (_this) => {
  let state = _this.state;
  state.currentActor = {slot: false, roll: false};

  state.combatList.map((item, x) => {
    let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + item.initiative.total;
    item.initiative.current = roll;

    state = _Dungeon.setCurrentActor(state, roll, item.slot);
    return item;
  });

  state.combatList.sort( sortInitiative );
  _this.setState( state );
}

var sortInitiative = (a, b) => {
  var aa = parseInt(a.initiative.current, 10), bb = parseInt(b.initiative.current, 10);
  var a2 = parseInt(a.initiative.total, 10), b2 = parseInt(b.initiative.total, 10);
  if (aa < bb) {
    return 1;
  } else {
    if (aa > bb) {
      return -1;
    } else {
      if (a2 < b2) {
        return 1;
      } else {
        if (a2 > b2) {
          return -1;
        } else {
          return 0;
        }
      }
    }
  }
}

_Dungeon.setCombatList = (state) => {
  let {slots, selectedDungeon, selectedEncounter, selectedParty, availableParties} = state;
  let party = availableParties.find(p => { return p._id === selectedParty} );

  slots.map((slot, x) => {
    if(slot.occupied){
      let uuid = uuidV4();
      slot.overlays.entity.uuid = uuid;
      let entity = Variables.clone(slot.overlays.entity);
      entity.slot = slot.id;
      state.combatList.push( entity );
      slot.overlays.entity = uuid;
    }
    return slot;
  });
  party.members.map((p, x) => {
    state.combatList.push( Variables.clone(p) ); 
    return p;
  });
  return state;
}

export {_Dungeon};