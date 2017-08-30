import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import CreateParty from '../components/CreateParty';
import * as weaponsApi from '../api/weapons-api';
import * as gearApi from '../api/gear-api';
import * as partiesApi from '../api/parties-api';
import * as entitiesApi from '../api/entities-api';

import * as EntityActionCreators from '../actions/entities-actions';
import * as PartyActionCreators from '../actions/parties-actions';

class CreatePartyContainer extends Component {

  componentDidMount() {
    entitiesApi.findCharacters();
    partiesApi.findParties();
    gearApi.findGear();
    weaponsApi.findWeapons();
  }

  render() {
    return (
      <CreateParty {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableCharacters: store.entitiesState.availableCharacters,
    availableWeapons: store.weaponsState.availableWeapons,
    availableParties: store.partiesState.availableParties,
    availableGear: store.gearState.availableGear,
    partiesState: store.partiesState,
    entitiesState: store.entitiesState
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch),
    boundPartyAC: bindActionCreators(PartyActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePartyContainer);