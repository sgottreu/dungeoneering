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

  findPowers(){
    _Powers.findPowers(this);
  }

	render() {
    return (
      <div className="AddPowers">
		    <PowersForm existingPowers={this.state.existingPowers} onFindPowers={this.findPowers} /> 
      </div>
		);

	}

}

export default AddPowers;