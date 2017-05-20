import React from 'react';

const EntityTileIcon = ({ entity }) => {
  let bkGdDiv;
  if(entity._type === 'character'){
    bkGdDiv = () => { return ( <div className='Entity character bkgd' />) };
  } else {
    bkGdDiv = () => { return false; };
  }
  return (
    <div className={'EntityHolder '}>
      <div key={entity.uuid} className={ `${entity._type} ${entity.iconClass} Entity icon` } />
       {bkGdDiv()}
    </div>
  );
}

export default EntityTileIcon;

