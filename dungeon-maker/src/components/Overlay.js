import React, { Component } from 'react';
import Door from './Door';

class Overlay extends Component {

   render() {
   		let {overlays} = this.props;
	    return (
	      <div className="Overlay">
	        {overlays.doors.map( (door, x) => (
	            <Door key={x} door={door}/>
	          ))}
	      </div>
	    );
   }
}



export default Overlay;
