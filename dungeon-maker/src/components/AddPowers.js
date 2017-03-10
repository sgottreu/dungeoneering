import React, { Component } from 'react';
import {_Powers} from './_Powers';
import PowersForm from './PowersForm';


class AddPowers extends Component {
  constructor(props){
    super(props);

    this.findPowers = this.findPowers.bind(this);

    this.state = {
      existingPowers: [],

    }
  }

  componentDidMount() {
    this.findPowers();
  }
  componentWillUnmount() {
  }

  findPowers(power){
    if(power === undefined){
      _Powers.findPowers(this);
      return true;
    }

    let state = this.state;
    if(power._id !== undefined && power._id !== false){
      let _i = state.existingPowers.findIndex(function(p) { return p._id === power._id});
      state.existingPowers[_i] = power;
    } else {
      state.existingPowers.push(power);
    }
    this.setState(state);
  }

	render() {
    return (
      <div className="AddPowers">
		    <PowersForm entityType='character' existingPowers={this.state.existingPowers} onFindPowers={this.findPowers} /> 
      </div>
		);

	}

}

export default AddPowers;