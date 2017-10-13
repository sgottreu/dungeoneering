import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import RunEncounter from '../components/RunEncounter';

import * as weaponsApi from '../api/weapons-api';
import * as gearApi from '../api/gear-api';
import * as partiesApi from '../api/parties-api';
import * as entitiesApi from '../api/entities-api';
import * as dungeonsApi from '../api/dungeons-api';
import * as encountersApi from '../api/encounters-api';
import * as powersApi from '../api/powers-api';

import * as DungeonActionCreators from '../actions/dungeons-actions';
import * as EncounterActionCreators from '../actions/encounters-actions';
import * as EntityActionCreators from '../actions/entities-actions';
// import * as WeaponActionCreators from '../actions/weapons-actions';
// import * as PartyActionCreators from '../actions/parties-actions';
// import * as PowerActionCreators from '../actions/powers-actions';

class RunEncounterContainer extends Component {

  componentDidMount() {
    gearApi.findGear();
    weaponsApi.findWeapons();
    dungeonsApi.findDungeons();
    entitiesApi.findMonsters();
    entitiesApi.findCharacters();
    encountersApi.findEncounters();
    powersApi.findPowers();
    partiesApi.findParties();
  }

  render() {
    return (
      <RunEncounter {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableMonsters: store.entitiesState.availableMonsters,
    availableCharacters: store.entitiesState.availableCharacters,
    availableWeapons: store.weaponsState.availableWeapons,
    existingPowers: store.powersState.existingPowers,
    availableParties: store.partiesState.availableParties,
    availableGear: store.gearState.availableGear,
    availableDungeons: store.dungeonsState.availableDungeons,
    availableEncounters: store.encountersState.availableEncounters,
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

export default connect(mapStateToProps, mapDispatchToProps)(RunEncounterContainer);