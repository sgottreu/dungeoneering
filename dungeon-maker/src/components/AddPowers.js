import React from 'react';
import PowersForm from './PowersForm';

function AddPowers( {existingPowers, current_power, power, boundPowerAC, entitiesState, powersState, boundEntityAC} )
{ 
    return (
      <div className="AddPowers">
		    <PowersForm 
          entityType='character' 
          existingPowers={existingPowers}  
          boundPowerAC={boundPowerAC}
          entitiesState={entitiesState}
          powersState={powersState}
          boundEntityAC={boundEntityAC}
        /> 
      </div>
		);
}

export default AddPowers;