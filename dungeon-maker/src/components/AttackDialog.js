import React, { Component } from 'react';
import {EntitySize} from './EntityTemplate';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import d20 from '../img/d20.png';
import attackIcon from '../img/attack.png';
import defenseIcon from '../img/defense.png';
import '../css/AttackDialog.css';

class AttackDialog extends Component {
  constructor(props){
    super(props);
    this.loadTileIcon = this.loadTileIcon.bind(this);
    this.loadAttackChip = this.loadAttackChip.bind(this);
    this.loadWeaponSelect = this.loadWeaponSelect.bind(this);
    this.handleWeaponSelect = this.handleWeaponSelect.bind(this);
  }

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps){

	}

  handleWeaponSelect = (attUuid, e, index) => {
    let _i = 0;
    let w_id = false;

    let _x = this.props.combatList.findIndex( (cb, i) => { return cb.uuid === attUuid });

    this.props.combatList[ _x ].inventory.forEach( (w, index2) => {
      if(w.category !== 'weapons') {
        return false;
      }
      if(_i === index){
        w_id = w.item._id;
      }
      _i++;
    });

    this.props.onHandleWeaponSelect(attUuid, w_id);
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

  loadAttackChip(icon, total, mod){
    let modstring = (mod !== undefined) ? ` (${mod}` : '';
    return (
      <Chip key="a">
        <Avatar size={32}><img src={icon} style={{width :'30px',height: '30px'}} /></Avatar>
        <span style={{fontWeight: 'bold'}}>{total}</span>
        {modstring}
      </Chip>
    )
  }

  loadWeaponSelect(attacker){
    if(attacker.inventory === undefined){
      return false;
    }
    return (
      <SelectField  floatingLabelText={`Choose Weapon`} value={attacker.currentWeapon} onChange={this.handleWeaponSelect.bind(this, attacker.uuid)} >
        {attacker.inventory.map( (w, index) => {
          if(w.category !== 'weapons') {
            return false;
          }
          return (
            <MenuItem 
              key={w.item._id} value={w.item._id} primaryText={`${w.item.name}`} />
          );
        })}
      </SelectField>
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
            <br/>
            <SelectField  floatingLabelText={`Choose Power`} value={attacker.currentPower} onChange={this.props.onHandlePowerSelect.bind(this, attacker.uuid)} >
							{attacker.powers.map( (power, index) => {
									return (
									<MenuItem 
										key={index} value={power.uuid} primaryText={`${power.name}`} />
									);
							})}
					  </SelectField>
            <br/>
            {this.loadWeaponSelect(attacker)}
            
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
          <div className="Attacker">
            {(att.attackRoll) ? this.loadAttackChip(attackIcon, att.attackRoll, `${att.natAttackRoll} + ${att.attackMod}`) : ''}
          </div>
          <div className="Target">
            {(att.attackRoll) ? this.loadAttackChip(defenseIcon, trg.defense) : ''}
          </div>
          <div style={{clear :'both',float: 'none'}}>
              <RaisedButton
              label="Roll Attack"
               icon={<img src={d20} style={{width :'30px',height: '30px'}} />}
              secondary={true} 
              onTouchTap={this.props.onRollAttack}
              className="button"
            />
          </div>
	      </div>
	    );
   }
}



export default AttackDialog;
