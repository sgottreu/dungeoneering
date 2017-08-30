import React from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import uuidV4  from 'uuid/v4';

const TooltipChip = ({ text, opts }) => {
  if(opts.show === undefined){
    opts.show = true;
  }
  const getIcon = (opts) => {
    if(opts.icon !== undefined){
      return (
        <i className={`fa ${opts.icon}`} aria-hidden="true"></i>
      )
    } 
    if(opts.img !== undefined) {
      return (
        <img alt={opts.img} src={opts.img} style={{width :'30px',height: '30px'}} />
      )
    }
    if(opts.text !== undefined) {
      return (
        <span>{opts.text}</span>
      )
    }
  }

  if(text === '' || text === undefined || !opts.show){
    return false;
  }

  return (
    <Chip className="chip" key={uuidV4()}>
      <Avatar size={32}>{getIcon(opts)}</Avatar>
      <span style={{fontWeight: 'bold'}}>{text}</span>
      {(opts.mod !== undefined) ? ` (${opts.mod})` : ''}
    </Chip>
  )

}

export default TooltipChip;

