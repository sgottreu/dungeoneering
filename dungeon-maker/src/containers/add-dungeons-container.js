import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DungeonMaker from '../components/DungeonMaker';
import uuidV4  from 'uuid/v4';

import * as dungeonsApi from '../api/dungeons-api';
import * as entitiesApi from '../api/entities-api';
import * as DungeonActionCreators from '../actions/dungeons-actions';
import * as EntityActionCreators from '../actions/entities-actions';

class AddDungeonsContainer extends Component {
  constructor(props){
    super(props);

    this.handleMyEvent = this.handleMyEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);
    dungeonsApi.findDungeons();
    entitiesApi.findMonsters();
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    let { selectedEntity } = this.props.dungeonsState;

    if(selectedEntity){
      var uuid = uuidV4();
      this.props.boundDungeonAC.setSlotEntity(selectedEntity, slot, uuid);
    }
  }

  render() {
    return (
      <DungeonMaker {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableMonsters: store.entitiesState.availableMonsters,
    availableCharacters: store.entitiesState.availableCharacters,
    dungeonsState: store.dungeonsState,
    entitiesState: store.entitiesState
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundDungeonAC: bindActionCreators(DungeonActionCreators, dispatch),
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDungeonsContainer);