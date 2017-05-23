import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import DungeonMaker from '../DungeonMaker';
import * as dungeonsApi from '../../api/dungeons-api';

import * as DungeonActionCreators from '../../actions/dungeons-actions';

class AddDungeonsContainer extends Component {

  componentDidMount() {
    dungeonsApi.findDungeons();
  }

  render() {
    return (
      <DungeonMaker {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableDungeons: store.dungeonsState.availableDungeons,
    dungeon: store.dungeonsState.dungeon,
      selectedTile: store.dungeonsState.selectedTile,
      selectedDungeon: store.dungeonsState.selectedDungeon,
      availableMonsters: store.monstersState.availableMonsters,
      availableCharacters: store.charactersState.availableCharacters,
      hoverObj: store.dungeonsState.hoverObj,
      mouse: store.dungeonsState.mouse
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundDungeonAC: bindActionCreators(DungeonActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDungeonsContainer);