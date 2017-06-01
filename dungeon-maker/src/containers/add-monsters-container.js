import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import EntityForm from '../components/EntityForm';
import * as weaponsApi from '../api/weapons-api';
import * as entitiesApi from '../api/entities-api';
import * as Entity from '../lib/Entity';

import * as EntityActionCreators from '../actions/entities-actions';
import * as PowerActionCreators from '../actions/powers-actions';

class AddMonstersContainer extends Component {

  componentDidMount() {
    weaponsApi.findWeapons();
    entitiesApi.findMonsters();
    //let state = this.calcRemainingPoints(this.state);
  }

  render() {
    return (
      <EntityForm className="AddMonster" {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return {
    availableMonsters: store.entitiesState.availableMonsters,
    availableWeapons: store.weaponsState.availableWeapons,
    entitiesState: store.entitiesState,
    powersState: store.powersState,
    EntityType: 'monster'
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch),
    boundPowerAC: bindActionCreators(PowerActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMonstersContainer);