import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import EntityForm from '../components/EntityForm';
import * as weaponsApi from '../api/weapons-api';
import * as entitiesApi from '../api/entities-api';
import * as Entity from '../lib/Entity';
import * as EntityActionCreators from '../actions/entities-actions';

class AddMonstersContainer extends Component {

  componentDidMount() {
    weaponsApi.findWeapons();
    entitiesApi.findMonsters();
    //let state = this.calcRemainingPoints(this.state);
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
    availableWeapons: store.weaponsState.availableWeapons,
    entitiesState: store.entitiesState,
    EntityType: 'monster'
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddMonstersContainer);