import React, { Component } from 'react';
import {_Powers} from './_Powers';
import PowersForm from './PowersForm';

function AddPowers( {existingPowers, current_power, power, boundPowerAC} )
{ 
    return (
      <div className="AddPowers">
		    <PowersForm entityType='character' 
          existingPowers={existingPowers}  
          current_power={current_power}
          power={power}
          boundPowerAC={boundPowerAC}
        /> 
      </div>
		);
}

export default AddPowers;