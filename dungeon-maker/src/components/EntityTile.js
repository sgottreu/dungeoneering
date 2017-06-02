import React from 'react';
import {EntitySize} from './EntityTemplate';
import uuidV4  from 'uuid/v4';


const EntityTile = ( { slot, entity, combatList, currentActor, onHandleObjMouseOver, availableMonsters } ) => {
    if(!entity) {
        entity = slot.overlays.entity;
        if(!entity) {
            return false;
        }
    }

    if(entity._id !== undefined && entity.name === undefined){
        let e = availableMonsters.find( m => { return m._id === entity._id} );
        if(e !== undefined){
            entity = e;
        }
    }

    let bolHP = true;
    if(combatList !== undefined){
        let cb = combatList.find(combat => { 
            if(combat === undefined){
                return false;
            }
            return combat.slot === slot.id
        });
        if(cb !== undefined){
            if(cb.hp <= 0 && entity._type === 'monster'){
                bolHP = false;
            }
        }
    }

    if(!entity || !bolHP){
        return false;
    }    
    let style, size;

    size = EntitySize.find(s => { return s.label === entity.size});

    if(size !== undefined && size !== false){
        style = {
            width: (75 * size.space),
            height: (75 * size.space),
            backgroundSize: (75 * size.space)
        }
    }

    let bkGdDiv = function() { return false; };
    if(entity._type === 'character'){
        bkGdDiv = function() { return ( <div className='Entity character bkgd' />) };
    }

    let entitySize = (isNaN(entity.size)) ? entity.size : EntitySize[ entity.size ].label;

    let uuid = (entity.uuid === undefined) ? uuidV4() : entity.uuid
    let ActorSlot = (currentActor === undefined) ? -1 : parseInt(currentActor.slot, 10);

    return (
        <div className={'EntityHolder '+((ActorSlot === parseInt(slot.id, 10)) ? 'currentActor' : '')}>
            <div 
                onMouseEnter={ (e,i,v) => { 
                    onHandleObjMouseOver(entity, 'entity', e) 
                } } 
                onMouseLeave={ (e,i,v) => { 
                    onHandleObjMouseOver(false, false, e) 
                } } 
                style={style} 
                data-slot={slot.id} 
                key={uuid} 
                className={entity._type+' '+entitySize+' '+entity.iconClass+' Entity icon'} />
                {bkGdDiv()}
        </div>
    );
}

export default EntityTile;