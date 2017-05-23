import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DungeonMaker from '../components/DungeonMaker';
import TileOptions from '../lib/TileOptions';
import * as dungeonsApi from '../api/dungeons-api';

import * as DungeonActionCreators from '../actions/dungeons-actions';

class AddDungeonsContainer extends Component {
  constructor(props){
    super(props);

    this.handleMyEvent = this.handleMyEvent.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);
    dungeonsApi.findDungeons();
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    let { selectedTile, selectedEntity } = this.props.dungeonsState;

    if(selectedEntity){
      this.boundDungeonAC.setSlotEntity(selectedEntity, slot);
    }

    if(selectedTile){
      let tileType = TileOptions.find( function(val) { return val.id === selectedTile });
      this.boundDungeonAC.updateKey('selectedTile', tileType);
    }
  }

  render() {
    return (
      <DungeonMaker {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  // return store.dungeonsState;
  return {
    availableMonsters: [],//store.monstersState.availableMonsters,
    availableCharacters: [],//store.charactersState.availableCharacters,
    dungeonsState: store.dungeonsState
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundDungeonAC: bindActionCreators(DungeonActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDungeonsContainer);