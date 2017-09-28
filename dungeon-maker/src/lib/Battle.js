import {Variables} from '../lib/Variables';

//************ Variables *******************/

export var Battle = {
    editCombatList: function(state){
        let entity = Variables.clone(state.slots[ slot-1 ].overlays.entity);
        entity.slot = state.slots[ slot-1 ].id;
    
        if(entity._type === undefined || entity._type === 'monster'){
          let _uuid = Variables.clone(entity.uuid);
          let _slot = Variables.clone(entity.slot);
    
          let _entity = this.props.availableMonsters.find( m => {
            return m._id === entity._id;
          });
          entity = Variables.clone(_entity);
          entity.uuid = _uuid;
          entity.slot = _slot;
    
          entity.powers.map(p => {
            p._id = uuidV4();
            return p;
          })
        }
    
        let cb = state.combatList.find(function(val){ 
          return parseInt(val.slot, 10) === parseInt(slot, 10); 
        });
        if(cb === undefined){
          state.combatList.push( entity );
        }

        return state;
    }
}

