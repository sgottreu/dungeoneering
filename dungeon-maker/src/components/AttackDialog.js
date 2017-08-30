import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TooltipChip from './TooltipChip';
import EntityTileIcon from './EntityTileIcon';
import uuidV4  from 'uuid/v4';

import d20 from '../img/d20.png';
import attackIcon from '../img/attack.png';
import defenseIcon from '../img/defense.png';
import damageIcon from '../img/pierced-heart.png';
import '../css/AttackDialog.css';



const AttackDialog = ( { 
    combatList, 
    onHandleWeaponSelect, 
    attackers, 
    attackStatus, 
    onHandlePowerSelect, 
    onRollAttack,
    onResetAttack, 
    onCloseAttackDialog
  }) => {

  const handleWeaponSelect = (attUuid, e, index) => {
    let _i = 0;
    let w_id = false;

    let _x = combatList.findIndex( (cb, i) => { return cb.uuid === attUuid });

    combatList[ _x ].inventory.forEach( (w, index2) => {
      if(w.category !== 'weapons') {
        return false;
      }
      if(_i === index){
        w_id = w.item._id;
      }
      _i++;
    });

    onHandleWeaponSelect(attUuid, w_id);
  }

  const loadWeaponSelect = (attacker) => {
    if(attacker.inventory === undefined){
      return false;
    }
    return (
      <SelectField  floatingLabelText={`Choose Weapon`} value={attacker.currentWeapon} onChange={(e,i) => { handleWeaponSelect(attacker.uuid, e, i)} } >
        {attacker.inventory.map( (w, index) => {
          if(w.category !== 'weapons') {
            return false;
          }
          return (
            <MenuItem key={w.item._id} value={w.item._id} primaryText={`${w.item.name}`} />
          );
        })}
      </SelectField>
    );
  }

  if(attackers.length === 0){
    return false;
  }

  let [ att, trg ] = attackers;
	let attacker = combatList.find(cb => { return cb.uuid === att.uuid } );
  let target = combatList.find(cb => { return cb.uuid === trg.uuid } );

  let showHit = (attackStatus === 'hit' && trg.damage !== undefined);
  let showAttack = (att.attackRoll) ? true : false;
  let targetHP = target.hp + ((showHit) ? ' ( -'+trg.damage+' )' : '');

  return (
    <div className="AttackDialog">
      <div className="Attacker">
        <EntityTileIcon key={uuidV4()} entity={attacker} />
        <br/>
        {attacker.name}
        <br/>
        <TooltipChip key={uuidV4()} text={attacker.hp} opts={{icon: 'fa-heart'}} />
        <br/>
        <SelectField  floatingLabelText={`Choose Power`} value={attacker.currentPower} onChange={(e,i) => { onHandlePowerSelect(attacker.uuid, e, i) } } >
					{attacker.powers.map( (power, index) => {
						return (
							<MenuItem key={index} value={power.uuid} primaryText={`${power.name}`} />
						);
					})}
			  </SelectField>
        <br/>
        {loadWeaponSelect(attacker)}
        
       </div>
      <div className="Target">
        <EntityTileIcon key={uuidV4()} entity={target} />
        <br/>
        {target.name}
        <br/>
        <TooltipChip key={uuidV4()} text={targetHP} opts={{icon: 'fa-heart'}} />            
      </div>
      
      <div style={{clear :'both',float: 'none', paddingTop: '5px'}}>
          <RaisedButton 
          style={{ display: 'block', width: '200px', margin: '5px auto 30px' }}
          label="Roll Attack"
           icon={<img alt='Roll Attack' src={d20} style={{width :'30px',height: '30px'}} />}
          secondary={true} 
          onTouchTap={onRollAttack}
          className="button"
        />
      </div>
      <div className="Attacker">
        <TooltipChip key={uuidV4()} text={att.attackRoll} opts={{img: attackIcon, show: showAttack, mod: `${att.natAttackRoll} + ${att.attackMod}`}} />   
        <TooltipChip key={uuidV4()} text={ '-'+trg.damage } opts={{img: damageIcon, show: showHit}} />   
      </div>
      <div className="Target">
        <TooltipChip key={uuidV4()} text={trg.defense} opts={{img: defenseIcon, show: showAttack}} />   
      </div>

      <div style={{clear :'both', float: 'none', paddingTop: '5px', margin: '0px auto'}}>
          <RaisedButton 
          style={{ float: 'left', display: 'inline-block', width: '115px', margin: '5px 15px 30px' }}
          label="Reset"
          
          secondary={true} 
          onTouchTap={onResetAttack}
          className="button"
        />
         <RaisedButton 
          style={{ float: 'left', display: 'inline-block', width: '115px', margin: '5px 15px 30px' }}
          label="Done"
          
          primary={true} 
          onTouchTap={onCloseAttackDialog}
          className="button"
        />
      </div>

    </div>
  );
   
}

export default AttackDialog;
