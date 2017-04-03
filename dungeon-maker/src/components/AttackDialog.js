import React, { Component } from 'react';
import {EntitySize} from './EntityTemplate';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import '../css/AttackDialog.css';

class AttackDialog extends Component {
  constructor(props){
    super(props);
    this.loadTileIcon = this.loadTileIcon.bind(this);
  }

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps){

	}
  loadTileIcon(entity){   
    let style, size;
    
    style = {
      width: '75px',
      height: '75px',
      backgroundSize: '75px'
    };

    let bkGdDiv = function() { return false; };
    if(entity._type === 'character'){
      bkGdDiv = function() { return ( <div className='Entity character bkgd' />) };
    }

    return (
      <div className={'EntityHolder '}>
        <div 
        style={style} key={entity.uuid} className={entity._type+' '+' '+entity.iconClass+' Entity icon'} />
         {bkGdDiv()}
      </div>
    );
  }

   render() {
   		let {combatList, attackers} = this.props;

      if(attackers.length === 0){
        return false;
      }

      let [ att, trg ] = attackers;
			let attacker = combatList.find(cb => { return cb.uuid === att.uuid } );
      let target = combatList.find(cb => { return cb.uuid === trg.uuid } );



	    return (
	      <div className="AttackDialog">
	        <div className="Attacker">
            {this.loadTileIcon(attacker)}
            <br/>
            {attacker.name}
            <br/>
            <Chip key="c">
              <Avatar size={32}><i className="fa fa-heart" aria-hidden="true"></i></Avatar>
              {attacker.hp}
            </Chip>
          </div>
          <div className="Target">
            {this.loadTileIcon(target)}
            <br/>
            {target.name}
            <br/>
            <Chip key="c">
              <Avatar size={32}><i className="fa fa-heart" aria-hidden="true"></i></Avatar>
              {target.hp}
            </Chip>
          </div>
          <br/>
          <RaisedButton
            label={'Roll Attack'} 
            secondary={true} 
            onTouchTap={this.onRollAttack}
            className="button"
          />
	      </div>
	    );
   }
}



export default AttackDialog;
