import React, { Component } from 'react';
import EntityTooltip from './EntityTooltip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EntityChooser extends Component {
  constructor(props){
    super(props);

    this.handleMouseOver = this.handleMouseOver.bind(this);

    this.state = {
      hoverEntity: false,
      mouse: {
        clientX: false,
        clientY: false
      }
    };

  }

  handleMouseOver = (entity, eve) => {
    let state = this.state;
    state.hoverEntity = entity;
    state.mouse.clientX = eve.clientX;
    state.mouse.clientY = eve.clientY;
    this.setState(state);
  }

	render() {
    let {saveEntities, selectedEntity, EntityType, selectedStyle, onHandleSelectedEntity} = this.props;

    return (
      <div className="EntityChooser">
        <EntityTooltip hoverEntity={this.state.hoverEntity} mouse={this.state.mouse} />
        <SelectField  floatingLabelText={`Saved ${EntityType}`} value={selectedEntity} onChange={onHandleSelectedEntity} 
              style={selectedStyle}>
              {saveEntities.map( (entity, index) => {
                  return (
                  <MenuItem onMouseEnter={this.handleMouseOver.bind(this, entity)} onMouseLeave={this.handleMouseOver.bind(this, false)} 
                    key={index} value={index} primaryText={`${entity.name} - Lvl: ${entity.level}`} />
                  );
              })}
        </SelectField>
      </div>
		);

	}

}

export default EntityChooser;