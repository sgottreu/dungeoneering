import React, { Component } from 'react';

class Door extends Component {
  constructor(props){
    super(props);
    this.setDoorPositions = this.setDoorPositions.bind(this);
    
  }
	
	setDoorPositions(side1, side2){
		let slot1 = parseInt(side1.slot, 10);
		let slot2 = parseInt(side2.slot, 10);
		if(slot1 - slot2 === 1){
			return ' left';
		} else if (slot2 - slot1 === 1){
			return ' right';
		} else if ((slot1 + 20) === slot2){
			return ' bottom';
		} else if ((slot1 - 20) === slot2){
			return ' top';
		}
		return ' ';
  }

  render() {
  	let {side1, side2} = this.props.door;
  	let className = 'Door ';
  	className += this.setDoorPositions(side1, side2);
	  return (
      <div className={className}></div>
    );
	}
}

export default Door;
