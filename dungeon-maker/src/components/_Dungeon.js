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

_Dungeon.setCurrentActor = (state, roll, slot, uuid, reset=false) => {
  if(!reset && (!state.currentActor.roll || state.currentActor.roll <= roll)){
    state.currentActor = {slot: slot, roll: roll, uuid: uuid};
  }
  if(reset){ 
    state.currentActor = {slot: slot, roll: roll, uuid: uuid};
  }
  return state;
}

_Dungeon.addCharToMap = (state) => {
  let party = state.party.members;

  party.map( (character, x) => {
    let _slot = state.slots.find( slot => {
      return !slot.occupied && slot.tileType === undefined;
    });

    if(_slot){
      state.slots[ _slot.id -1 ].overlays.entity = character.uuid;
      state.slots[ _slot.id -1 ].occupied = true;
      
      let _i = state.combatList.findIndex(cmb => { return cmb.uuid === character.uuid});
      state.combatList[ _i ].slot = _slot.id;
    }
  });

  return state;
}

_Dungeon.rollInitiative = (_this) => {
  let state = _this.state;
  state.currentActor = {slot: false, roll: false, uuid: false};

  state.combatList.map((item, x) => {
    let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + item.initiative.total;
    item.initiative.current = roll;

    state = _Dungeon.setCurrentActor(state, roll, item.slot, item.uuid);
    return item;
  });

  state.combatList.sort( sortInitiative );
  _this.setState( state );
}

_Dungeon.setCombatList = (state) => {
  let {slots, selectedParty, availableParties} = state;
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
  party.members.map((p, i) => {
    state.combatList.push( Variables.clone(p) ); 
    return p;
  });
  return state;
}

_Dungeon.setAttackAttributes = (state) => {
  state.combatList.forEach( (cb, i) => {
    state.combatList[i].currentPower = false;
    state.combatList[i].currentWeapon = false;
    cb.powers.forEach( (pp, j) => {
      if(cb._type === 'character'){
        let _power = state.existingPowers.find( p => { return p._id == pp});
        state.combatList[i].powers[j] = Variables.clone( _power );
      }
      state.combatList[i].powers[j].uuid = uuidV4();
    });
  });
  return state;
}

export {_Dungeon};