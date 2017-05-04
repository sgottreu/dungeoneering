import React from 'react';
import { connect } from 'react-redux';
import AddPowers from '../AddPowers';

const mapStateToProps = function(store) {

  return store.addPowersState;

};

export default connect(mapStateToProps)(AddPowers);