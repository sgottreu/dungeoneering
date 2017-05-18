import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import AddPowers from '../AddPowers';
import * as powersApi from '../../api/powers-api';

import * as PowerActionCreators from '../../actions/powers-actions';

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
  return store.powersState;
};

function mapDispatchToProps(dispatch) {
  return({
    boundPowerAC: bindActionCreators(PowerActionCreators, dispatch)
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPowersContainer);