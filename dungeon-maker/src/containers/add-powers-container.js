import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import AddPowers from '../components/AddPowers';
import * as powersApi from '../api/powers-api';

import * as PowerActionCreators from '../actions/powers-actions';
import * as EntityActionCreators from '../actions/entities-actions';

class AddPowersContainer extends Component {

  componentDidMount() {
    powersApi.findPowers();
  }

  render() {
    return (
      <AddPowers {...this.props} />
    );
  }
}

var mapStateToProps = function(store) {
  return {
    existingPowers: store.powersState.existingPowers,
    powersState: store.powersState
  };
};

function mapDispatchToProps(dispatch) {
  return({
    boundPowerAC: bindActionCreators(PowerActionCreators, dispatch),
    boundEntityAC: bindActionCreators(EntityActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPowersContainer);