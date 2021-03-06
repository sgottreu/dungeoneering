import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import EntityForm from '../components/EntityForm';
import * as weaponsApi from '../api/weapons-api';
import * as powersApi from '../api/powers-api';
import * as entitiesApi from '../api/entities-api';
import * as Entity from '../lib/Entity';

import * as EntityActionCreators from '../actions/entities-actions';

class AddCharactersContainer extends Component {

  componentDidMount() {
    entitiesApi.findCharacters();
    powersApi.findPowers();
    weaponsApi.findWeapons();

    let _state = this.props.entitiesState;
    let _points = Entity.calcRemainingPoints(_state.points, _state.entity);
    this.props.boundEntityAC.updatePointsKey( 'remainingPoints', _points.remainingPoints );
  }

  render() {
    return (
      <EntityForm {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableMonsters: store.entitiesState.availableMonsters,
    availableCharacters: store.entitiesState.availableCharacters,
    availableWeapons: store.weaponsState.availableWeapons,
    existingPowers: store.powersState.existingPowers,
    entitiesState: store.entitiesState,
    EntityType: 'character'
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCharactersContainer);