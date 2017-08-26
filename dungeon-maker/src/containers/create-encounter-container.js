import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import CreateEncounter from '../components/CreateEncounter';
import * as weaponsApi from '../api/weapons-api';
import * as gearApi from '../api/gear-api';
import * as partiesApi from '../api/parties-api';
import * as entitiesApi from '../api/entities-api';
import * as dungeonsApi from '../api/dungeons-api';
import * as encountersApi from '../api/encounters-api';

// import * as Entity from '../lib/Entity';

import * as DungeonActionCreators from '../actions/dungeons-actions';
import * as EncounterActionCreators from '../actions/dungeons-actions';
import * as EntityActionCreators from '../actions/entities-actions';


class CreateEncounterContainer extends Component {

  componentDidMount() {
    // entitiesApi.findCharacters();
    // partiesApi.findParties();
    gearApi.findGear();
    weaponsApi.findWeapons();
    dungeonsApi.findDungeons();
    entitiesApi.findMonsters();
    encountersApi.findEncounters();
  }

  render() {
    return (
      <CreateEncounter {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableMonsters: store.entitiesState.availableMonsters,
    // availableCharacters: store.entitiesState.availableCharacters,
    availableWeapons: store.weaponsState.availableWeapons,
    availableParties: store.partiesState.availableParties,
    availableGear: store.gearState.availableGear,
    availableDungeons: store.dungeonsState.availableDungeons,
    dungeonsState: store.dungeonsState,
    entitiesState: store.entitiesState,
    encountersState: store.encountersState
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundDungeonAC: bindActionCreators(DungeonActionCreators, dispatch),
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch),
    boundEncounterAC: bindActionCreators(EncounterActionCreators, dispatch),
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEncounterContainer);