import React, { Component } from 'react';
import {EntitySize} from './EntityTemplate';
import uuidV4  from 'uuid/v4';
import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {
  
  constructor(props){
    super(props);
    this.loadEntityTile = this.loadEntityTile.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.setAttackStatus = this.setAttackStatus.bind(this);

  }

  handleMouseOver = (entity, type, eve) => {
    this.props.onHandleObjMouseOver(entity, type, eve);
  }

  setAttackStatus(uuid, e){
    // this.props.onSetAttackerStatus(this.refs.attackToggle.props['data-uuid'], this.refs.attackToggle.state.switched);
    this.props.onSetAttackerStatus(uuid);
  }

  loadEntityTile(slot, entity=false){
    if(!entity) {
      entity = slot.overlays.entity;
      if(!entity) {
        return false;
      }
    }

    if(entity._id !== undefined && entity.name === undefined){
      let e = this.props.availableMonsters.find( m => { return m._id === entity._id} );
      if(e !== undefined){
        entity = e;
      }
    }

    let hp = true;
    let combatList = this.props.combatList;
    if(combatList !== undefined){
      let cb = combatList.find(combat => { 
        if(combat === undefined){
          return false;
        }
        return combat.slot === slot.id
      });
      if(cb !== undefined){
        if(cb.hp <= 0 && entity._type === 'monster'){
          hp = false;
        }
      }
    }

    if(!entity || !hp){
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
    let ActorSlot = (this.props.currentActor === undefined) ? -1 : parseInt(this.props.currentActor.slot, 10);
    return (
      <div className={'EntityHolder '+((ActorSlot === parseInt(slot.id, 10)) ? 'currentActor' : '')}>
        <div onMouseEnter={this.handleMouseOver.bind(this, entity, 'entity')} onMouseLeave={this.handleMouseOver.bind(this, false, false)} 
        style={style} data-slot={slot.id} key={uuid} className={entity._type+' '+entitySize+' '+entity.iconClass+' Entity icon'} />
         {bkGdDiv()}
      </div>
    );
  }


  render() {
    let {id, slot, onAddTile, entity} = this.props;
    let className = 'DungeonGridSlot ';
    className += (slot.tileType === undefined || slot.tileType === '') ? '' : slot.tileType;

    if(onAddTile === undefined){
      onAddTile = function() { return false };
    }

    return (
      <div ref={'tile'+slot.id} id={'_slot'+slot.id}
        className={className} data-slot={id} onClick={onAddTile.bind(this, id)}>&nbsp;
        {this.loadEntityTile(slot, entity)}
      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
