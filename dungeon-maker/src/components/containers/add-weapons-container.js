import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import AddWeapon from '../AddWeapon';
import * as weaponsApi from '../../api/weapons-api';

import * as WeaponActionCreators from '../../actions/weapons-actions';

class AddWeaponsContainer extends Component {

  componentDidMount() {
    weaponsApi.findWeapons();
  }

  render() {
    console.log(this.props);
    return (
      <AddWeapon {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  if(store.weaponsState === undefined){
      store.weaponsState = {};
  }
  return store.weaponsState;
};

function mapDispatchToProps(dispatch) {
  return({
    boundWeaponAC: bindActionCreators(WeaponActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddWeaponsContainer);