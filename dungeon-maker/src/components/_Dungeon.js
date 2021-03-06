import {Variables} from '../lib/Variables';
import uuidV4  from 'uuid/v4';


class _Dungeon {};

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

_Dungeon.addCharToMap = (party, slots, availableCharacters) => {
  let members = party.members;

  members.map( (character, x) => {
    let _slot = slots.find( slot => {
      return !slot.occupied && (slot.tileType === undefined || slot.tileType === '');
    });

    if(_slot){
      let _character = availableCharacters.find(c => { return c._id === character})
      slots[ _slot.id -1 ].overlays.entity = Variables.clone( _character );//character.uuid;
      slots[ _slot.id -1 ].occupied = true;
      return true;
    }
    return false;
  });

  return slots;
}

_Dungeon.setUuidMonsters = (state) => {
  state.slots.map( (slot, x) => {
    if(slot.occupied && slot.overlays.entity && slot.overlays.entity.uuid === undefined){
      slot.overlays.entity.uuid = uuidV4();
      return slot;
    }
    return slot;
  });

  return state;
}

_Dungeon.rollInitiative = (_this, existingPowers) => {
  let state = _this.state;

  state = _Dungeon.setAttackAttributes(state, existingPowers);

  state.currentActor = {slot: false, roll: false, uuid: false};

  state.combatList.map((item, x) => {
    let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + item.initiative.total;
    item.initiative.current = roll;

    state = _Dungeon.setCurrentActor(state, roll, item.slot, item.uuid);
    return item;
  });

  state.combatList.sort( sortInitiative );
  state.pickingCombat = false;
  _this.setState( state );
}

_Dungeon.setAttackAttributes = (state, existingPowers) => {
  state.combatList.forEach( (cb, i) => {
    state.combatList[i].currentPower = false;
    state.combatList[i].currentWeapon = false;

    if(cb.powers !== undefined){
      cb.powers.forEach( (pp, j) => {
        if(cb._type === 'character'){
          let _power = existingPowers.find( p => { return p._id === pp});
          state.combatList[i].powers[j] = Variables.clone( _power );
        }
        state.combatList[i].powers[j].uuid = uuidV4();
      });
    }
  });
  return state;
}

export {_Dungeon};