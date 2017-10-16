import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import AddGear from '../components/AddGear';
import * as gearApi from '../api/gear-api';

import * as GearActionCreators from '../actions/gear-actions';

class AddGearContainer extends Component {

  componentDidMount() {
    gearApi.findGear();
  }

  render() {
    return (
      <AddGear {...this.props} />
    );
  }
}

const mapStateToProps = function(store) {
  return store.gearState;
};

function mapDispatchToProps(dispatch) {
  return({
    boundGearAC: bindActionCreators(GearActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddGearContainer);