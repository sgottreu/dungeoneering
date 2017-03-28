import React, { Component } from 'react';
import {EntitySize} from './EntityTemplate';

import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {
  
  constructor(props){
    super(props);
    this.loadEntityTile = this.loadEntityTile.bind(this);

    this.handleMouseOver = this.handleMouseOver.bind(this);

  }

  handleMouseOver = (entity, type, eve) => {
    this.props.onHandleObjMouseOver(entity, type, eve);
  }

  componentDidMount(){
    
  }

  loadEntityTile(slot){
    if(!slot.overlays.entity){
      return false;
    }
    let entity = slot.overlays.entity;

    let style, size;
    
    if(entity._type === 'character'){
      size = EntitySize.find(s => { return s.label === entity.size});
    } else {
      size = (EntitySize[entity.size] === undefined) ? false : EntitySize[entity.size];
    }

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

    return (
      <div className={'EntityHolder '+((this.props.currentActor.slot === slot.id) ? 'currentActor' : '')}>
        <div onMouseEnter={this.handleMouseOver.bind(this, entity, 'entity')} onMouseLeave={this.handleMouseOver.bind(this, false, false)} 
        style={style} data-slot={slot.id} key={entity._id} className={entity._type+' '+entitySize+' '+entity.iconClass+' Entity icon'} />
         {bkGdDiv()}
      </div>
    );
  }


  render() {
    let {id, slot, onAddTile} = this.props;
    let className = 'DungeonGridSlot ';
    className += (slot.tileType === undefined || slot.tileType === '') ? '' : slot.tileType;

    if(onAddTile === undefined){
      onAddTile = function() { return false };
    }

    return (
      <div ref={'tile'+slot.id} id={'_slot'+slot.id}
        className={className} data-slot={id} onClick={onAddTile.bind(this, id)}>&nbsp;
        {this.loadEntityTile(slot)}
      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
