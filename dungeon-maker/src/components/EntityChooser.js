import React, { Component } from 'react';
import EntityTooltip from './EntityTooltip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class EntityChooser extends Component {
  constructor(props){
    super(props);

  }

	render() {
    let {saveEntities, selectedEntity, EntityType, selectedStyle, onHandleSelectedEntity, mouse, hoverObj} = this.props;

    return (
      <div className="EntityChooser">
        <EntityTooltip hoverObj={hoverObj} mouse={mouse} />
        <SelectField  floatingLabelText={`Saved ${EntityType}`} value={selectedEntity} onChange={onHandleSelectedEntity} 
              style={selectedStyle}>
              {saveEntities.map( (entity, index) => {
                  return (
                  <MenuItem 
                    onMouseEnter={(e,i,v) => { this.props.boundEntityAC.updateMouseover(entity, 'entity', e) } } 
                    onMouseLeave={(e,i,v) => { this.props.boundEntityAC.updateMouseover(false, false, e) } }
                    key={index} 
                    value={index} 
                    primaryText={`${entity.name} - Lvl: ${entity.level}`} />
                  );
              })}
        </SelectField>
      </div>
		);

	}

}

export default EntityChooser;