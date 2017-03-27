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

_Dungeon.rollInitiative = function(_this){
  let state = _this.state;
  state.currentActor = {slot: false, roll: false};

  for(var x=0,len=state.slots.length;x<len;x++){
    if(state.slots[x].occupied){
      let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + state.slots[x].overlays.entity.initiative.total;
      state.slots[x].overlays.entity.initiative.current = roll;

      if(!state.currentActor.roll || state.currentActor.roll <= roll){
        state.currentActor = {slot: x+1, roll: roll};
      }
    }
  }

  state.party.members.map((member,x) => {
    let roll = (Math.floor(Math.random() * (20 - 1)) + 1) + member.initiative.total;
    state.party.members[x].initiative.current = roll;

    if(!state.currentActor.roll || state.currentActor.roll <= roll){
      state.currentActor = {slot: x+1, roll: roll};
    }
    
  })

  _this.setState( state );
}

export {_Dungeon};