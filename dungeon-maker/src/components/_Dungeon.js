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

export {_Dungeon};