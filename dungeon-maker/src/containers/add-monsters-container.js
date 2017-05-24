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
  return store.weaponsState;
};

function mapDispatchToProps(dispatch) {
  return({
    boundWeaponAC: bindActionCreators(WeaponActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWeaponsContainer);