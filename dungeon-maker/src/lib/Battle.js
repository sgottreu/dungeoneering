import {Variables} from '../lib/Variables';
// import uuidV4  from 'uuid/v4';
import {getEntity} from '../lib/Entity';

//************ Variables *******************/

export var editCombatList = function(state, slot, availableEntities){
    let entity = Variables.clone(state.slots[ slot-1 ].overlays.entity);

    entity = getEntity({monsters: availableEntities.monsters, characters: availableEntities.characters}, entity);
    entity.slot = state.slots[ slot-1 ].id;

    let cb = state.combatList.find(function(val){ 
      return parseInt(val.slot, 10) === parseInt(slot, 10); 
    });
    if(cb === undefined){
      state.combatList.push( entity );
    }

    return state;
}


