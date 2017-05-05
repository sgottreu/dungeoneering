import axios from 'axios';
import {Variables} from '../lib/Variables';
import uuidV4  from 'uuid/v4';



// var checkSlot = (foundSlots, slot, x) => {
//   var door = (slot.door === undefined) ? false : slot.door;
//   if( slot.tileType !== undefined && slot.tileType !== '' && !door) {
//     if(foundSlots[x] === undefined) {
//       foundSlots[x] = false;
//     } 
//   } 
//   return foundSlots;
// }

// var getNumSlots = (foundSlots, found=false) => {
//   let val = 0;
//   foundSlots.map(slot => { 
//     if(slot !== undefined) { 
//       if(found){
//         if(slot === true) {
//           val++;
//         }
//       } else {
//         val++;
//       }
//     } 
//     return true;
//   });
//   return val;
// }

// var checkDirections = (slots, current_slot, foundSlots) => {
//   let col_start = Math.floor(current_slot/20);
//   let row_start = current_slot - (Math.floor(current_slot/20) * 20);
//   let row_end   = 200 - (20 - row_start);
//   let x = 0, preLen = 0, postLen = 0;
//   let westBound = (col_start  * 20) + 1;
//   let eastBound = (col_start  * 20) + 20;

//   foundSlots[ current_slot ] = true;

//   for(x=current_slot;x>=westBound;x--){
//     preLen = 0; postLen = 0;
//     preLen = getNumSlots(foundSlots);
//     foundSlots = checkSlot (foundSlots, slots[x-1], x);
//     postLen = getNumSlots(foundSlots);
//     if(preLen === postLen && x !== current_slot) { break; }
//   }
//   for(x=current_slot;x<=eastBound;x++){
//     preLen = 0; postLen = 0;
//     preLen = getNumSlots(foundSlots);
//     foundSlots = checkSlot (foundSlots, slots[x-1], x);
//     postLen = getNumSlots(foundSlots);
//     if(preLen === postLen && x !== current_slot) { break; }
//   }

//   for(x=current_slot;x>=row_start;x-=20){
//     preLen = 0; postLen = 0;
//     preLen = getNumSlots(foundSlots);
//     foundSlots = checkSlot (foundSlots, slots[x-1], x);
//     postLen = getNumSlots(foundSlots);
//     if(preLen === postLen && x !== current_slot) { break; }
//   }
//   for(x=current_slot;x<=row_end;x+=20){
//     preLen = 0; postLen = 0;
//     preLen = getNumSlots(foundSlots);
//     foundSlots = checkSlot (foundSlots, slots[x-1], x);
//     postLen = getNumSlots(foundSlots);
//     if(preLen === postLen && x !== current_slot) { break; }
//   }

//   return foundSlots;
// }


// var findInitiativeArea = (slots) => {
//   var entrance = slots.find( slot => { return slot.entrance } );
//   let entry_slot = entrance.id;
  
//   let foundSlots = [];
//   foundSlots[ entry_slot ] = true;

//   foundSlots = checkDirections(slots, entry_slot, foundSlots);

//   var allFound = 200;

//   while(allFound > getNumSlots(foundSlots, true)){
//     for(var x=1,len=foundSlots.length;x<=len;x++){
//       if(foundSlots[x] !== undefined && foundSlots[x] === false) { 
//         foundSlots = checkDirections(slots, x, foundSlots);
//       }
//     }

//     allFound = getNumSlots(foundSlots);
//   }

//   let availSlots = [];

//   foundSlots.map((slot,x) => { 
//     if(slot !== undefined) {
//       availSlots.push(x);
//     }
//     return slot;
//   });

//   return availSlots;
// }


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
      return !slot.occupied && (slot.tileType === undefined || slot.tileType === '');
    });

    if(_slot){
      state.slots[ _slot.id -1 ].overlays.entity = Variables.clone(character);//character.uuid;
      state.slots[ _slot.id -1 ].occupied = true;
      
      // let _i = state.combatList.findIndex(cmb => { return cmb.uuid === character.uuid});
      // state.combatList[ _i ].slot = _slot.id;
      return true;
    }
    return false;
  });

  return state;
}

_Dungeon.setUuidMonsters = (state) => {
  state.slots.map( (slot, x) => {
    if(slot.occupied && slot.overlays.entity && slot.overlays.entity.uuid === undefined){
      state.slots[x].overlays.entity.uuid = uuidV4();
    }
    return true;
  });

  return state;
}

_Dungeon.rollInitiative = (_this) => {
  let state = _this.state;

  //let availSlots = findInitiativeArea(state.slots);

  // let availSlots = [];

  // state = _Dungeon.setCombatList(state, availSlots);
  state = _Dungeon.setAttackAttributes(state);

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

// _Dungeon.setCombatList = (state, availSlots) => {
//   let {slots} = state;
//   //let party = availableParties.find(p => { return p._id === selectedParty} );

//   slots.map((slot, x) => {
//     let aSlot = availSlots.find(s => { return s === slot.id});
//     if(slot.occupied && aSlot !== undefined){
//       if(slot.overlays.entity.uuid === undefined){
//         let uuid = uuidV4();
//         slot.overlays.entity.uuid = uuid;
//       }
      
//       let entity = Variables.clone(slot.overlays.entity);
//       entity.slot = slot.id;
//       state.combatList.push( entity );
//     }
//     return slot;
//   });

//   return state;
// }

_Dungeon.setAttackAttributes = (state) => {
  state.combatList.forEach( (cb, i) => {
    state.combatList[i].currentPower = false;
    state.combatList[i].currentWeapon = false;
    cb.powers.forEach( (pp, j) => {
      if(cb._type === 'character'){
        let _power = state.existingPowers.find( p => { return p._id === pp});
        state.combatList[i].powers[j] = Variables.clone( _power );
      }
      state.combatList[i].powers[j].uuid = uuidV4();
    });
  });
  return state;
}







export {_Dungeon};