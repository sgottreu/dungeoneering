import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import AddPowers from '../AddPowers';
import * as powersApi from '../../api/powers-api';

import * as PowerActionCreators from '../../actions/powers-actions';

//console.log(PowerActionCreators);

// http://redux.js.org/docs/api/bindActionCreators.html

class AddPowersContainer extends Component {

  componentDidMount() {
    powersApi.findPowers();
  }

  render() {
    let { dispatch } = this.props;
  console.log(this.props);
    let boundPowerAC = bindActionCreators(PowerActionCreators, dispatch);

    return (
      <AddPowers {...this.props} 
        boundPowerAC={boundPowerAC} />
    );
  }
}

const mapStateToProps = function(store) {

  return store.powersState;

};

export default connect(mapStateToProps)(AddPowersContainer);