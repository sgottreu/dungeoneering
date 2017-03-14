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

_Dungeon.images = {
  floor: 'brick-wall.png',
  stairs: 'stairs.png',   
  gloop: 'gloop.png',   
  "spiky-pit": 'spiky-pit.png',
  entry: 'entry.png',    
  exit: 'exit.png',    
  gravel: 'gravel.png',
  chest: 'chest.png',
  door_ew: 'door_ew.png',
  door_ns: 'door_ns.png',    
  portcullus_ew: 'portcullus_ew.png',
  portcullus_ns: 'portcullus_ns.png' 


}

export {_Dungeon};