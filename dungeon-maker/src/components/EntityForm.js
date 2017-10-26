import React, { Component } from 'react';

import {Variables} from '../lib/Variables';
import {Powers} from '../lib/Powers';
import * as Entity from '../lib/Entity';
import * as Gear from '../lib/Gear';
import * as entitiesApi from '../api/entities-api';
import PowersForm from './PowersForm';
import SortByKey from '../lib/SortByKey';
import EntityChooser from './EntityChooser';
import WeaponTooltip from './WeaponTooltip';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import uuidV4  from 'uuid/v4';
import Toggle from 'material-ui/Toggle';

import '../css/EntityForm.css';

class EntityForm extends Component {
  
  constructor(props){
    super(props);

    this.boundEntityAC = this.props.boundEntityAC;
    this.boundPowerAC = this.props.boundPowerAC;
    this.rState = this.props.entitiesState;

    this.EntityType = this.props.EntityType;
    this.weaponField = null;

    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleRaceChange = this.handleRaceChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleHPChange = this.handleHPChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.changeAbility = this.changeAbility.bind(this);
    this.changeIcon = this.changeIcon.bind(this);

    this.handleEntitySave = this.handleEntitySave.bind(this);
    this.handleInitiativeChange = this.handleInitiativeChange.bind(this);
    this.handleArmorClassChange = this.handleArmorClassChange.bind(this);
    this.handleFortitudeChange = this.handleFortitudeChange.bind(this);
    this.handleReflexChange = this.handleReflexChange.bind(this);
    this.handleWillpowerChange = this.handleWillpowerChange.bind(this);
    

    this.loadRoleField = this.loadRoleField.bind(this);
    this.loadXPField = this.loadXPField.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadRaceField = this.loadRaceField.bind(this);
    this.loadEntityIconField = this.loadEntityIconField.bind(this);
    this.loadPowersForm = this.loadPowersForm.bind(this);

    this.loadPowersField = this.loadPowersField.bind(this);
    this.loadWeaponsField = this.loadWeaponsField.bind(this);
    this.handleSelectedEntity = this.handleSelectedEntity.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this);
    this.selectCharacterPower = this.selectCharacterPower.bind(this);

    this.loadShieldField = this.loadShieldField.bind(this);

    this.updateSnackBar = this.updateSnackBar.bind(this);

    this.state = {
      snackbarOpen: false,
      snackbarMsg: ''
    };
  }

  updateSnackBar = (msg, open=false) => {
    this.setState( { snackbarMsg: msg, snackbarOpen: open } );
  }

  resetForm(){
    this.boundEntityAC.updateKey('selectedEntity', false);
    this.boundEntityAC.updateKey('entity', Variables.clone(Entity.Template));
  }

  handleSelectedEntity = (event, index) => {
    this.boundEntityAC.updateKey('selectedEntity', index);
    let key = (this.EntityType === 'monster') ? 'availableMonsters' : 'availableCharacters';
    this.boundEntityAC.updateKey( 'entity', Variables.clone( this.props[key][index] ) );
    if(this.EntityType === 'monster'){
      this.boundPowerAC.loadExistingPowers(this.props[key][index].powers);
    }
  }

  selectWeapon = (id) => {
    // this.boundEntityAC.updateEntityWeapon(id);

    let item = Gear.findItem(id, this.props.availableGear);

    let _this = this;
    let { entity } = this.props.entitiesState;
    let state = this.state;

    let _foundItem = entity.inventory.find(function(_item) { 
      return _item.item._id === id && _item.item.quantity > 0
    });

    let step = (_foundItem === undefined) ? 'add' : 'remove';

    this.boundEntityAC.updateEntityInventory(entity, item, step);
    state.snackbarMsg = 'Added to Inventory';   
    state.snackbarOpen = true;

    this.setState(state);

  }

  handleChange = (event) => {
    this.boundEntityAC.updateEntityKey( event.target.name, event.target.value);
  }

	handleRoleChange = (event, index) => {
		this.boundEntityAC.updateEntityKey('role', index);
	}


	handleSizeChange = (event, index) => {
		this.boundEntityAC.updateEntityKey('size', Entity._Size[index].label);
	}

  handleClassChange = (event, index) => {    
    this.boundEntityAC.updateEntityClass( index );
  }

  changeIcon = (event) => {
    this.boundEntityAC.updateEntityKey('iconClass', event.target.dataset.icon);
  }

  handleRaceChange = (event, index) => {
    this.boundEntityAC.updateEntityRace(index);
  }

  handleHPChange(event){
    this.boundEntityAC.updateEntityHp( event.target.value );
  }

  handleInitiativeChange(event){
    this.boundEntityAC.updateEntityInitiative(event.target.value);
  }

  handleArmorClassChange(event){
    this.boundEntityAC.updateEntityArmorclass(event.target.value);
  }

  handleFortitudeChange(event){
    this.boundEntityAC.updateEntityDefense('fortitude', event.target.value);
  }
  handleReflexChange(event){
    this.boundEntityAC.updateEntityDefense('reflex', event.target.value);
  }
  handleWillpowerChange(event){
    this.boundEntityAC.updateEntityDefense('willpower', event.target.value);
  }


  handleLevelChange = (event) => {
    this.boundEntityAC.updateEntityLevel(event.target.value);
  }

  handleEntitySave = () => {
    let updateSnackBar = this.updateSnackBar;
    let key = (this.EntityType === 'monster') ? 'Monster' : 'Character';
    if(this.props.entitiesState.entity.uuid === undefined){
      this.props.entitiesState.entity.uuid = uuidV4();
    }
    entitiesApi.saveEntity(this.props.entitiesState.entity)
    .then( function(response){
      updateSnackBar(key+' saved.', true);
    });
  };

  changeAbility = (event) => {
    let {entity, points} = this.props.entitiesState;
    entity = Entity.calcRemainingPoints(entity, event.target);
    if(points.remainingPoints === 0 ){ 
      if(event.target.value >= entity.abilities[ event.target.name ].score){
        return false;
      }
    } 
    this.boundEntityAC.updateEntityAbility(event.target);       
  }

  selectCharacterPower = (power, event) => {
    if(power._id === undefined){
      return false;
    }
    this.boundEntityAC.updateEntityCharacterPower(power._id);
  }

  loadArmorField(){
    let {entity} = this.props.entitiesState;

    let entityArmor = Gear.getEntityArmor(entity.inventory);
    entityArmor = (entityArmor === undefined) ? { item: {_id : false }} : entityArmor;

    let _armor = Gear.regularArmor(this.props.availableGear);

    return (
      <SelectField className="bottomAlign" floatingLabelText="Armor" value={entityArmor.item._id} 
        onChange={(e,i,v) => {
          let a = Gear.findItem(v, this.props.availableGear);
          if(entity._type === 'monster'){
            this.boundEntityAC.updateEntityArmor( v, a );
          }
        }} 
      >
        <MenuItem key={-1} value={false} primaryText="None" />
        {_armor.map( (armor, index) => (
          <MenuItem key={index} value={armor._id} primaryText={`${armor.name}`} />
        ))}
      </SelectField>
    );
  }

  loadRoleField(){
    let {entity} = this.props.entitiesState;
  	return (
    	<SelectField className="bottomAlign" floatingLabelText="Role" value={entity.role} onChange={this.handleRoleChange} >
        {Entity._Role.map( (role, index) => (
        	<MenuItem key={index} value={index} primaryText={role} />
        ))}
      </SelectField>
    );
  }

  loadRaceField(){
    let {entity} = this.props.entitiesState;
    return (
      <SelectField  className="bottomAlign" floatingLabelText="Race" value={entity.race} onChange={this.handleRaceChange} >
        {Entity._Race.map( (race, index) => (
          <MenuItem key={index} value={index} primaryText={race.name} />
        ))}
      </SelectField>
    );
  }

  loadClassField(){
    let {entity} = this.props.entitiesState;
    return (
      <SelectField className="bottomAlign"  floatingLabelText="Class" value={entity.class} onChange={this.handleClassChange} >
        {Entity._Class.map( (_class, index) => (
          <MenuItem key={index} value={index} primaryText={_class.name} />
        ))}
      </SelectField>
    );
  }

  loadXPField(){
    let {entity} = this.props.entitiesState;
    return (
      <TextField className="shortField" floatingLabelText="XP" type="number" value={entity.xp} name="xp" onChange={this.handleChange} />
    );
  }

  loadPowersForm() {
    let {entity, selectedEntity} = this.props.entitiesState;

    entity = Entity.getEntity({monsters: this.props.availableMonsters, characters: this.props.availableCharacters}, entity);

    return (
      <PowersForm 
        boundPowerAC={this.props.boundPowerAC}
        selEntity={selectedEntity} 
        existingPowers={entity.powers} 
        entityType="monster" 
        powersState={this.props.powersState}
        availableWeapons={this.props.availableWeapons} 
        weapons={entity.weapons}
        hoverObj={this.props.entitiesState.hoverObj} 
        mouse={this.props.entitiesState.mouse}
      />
    );
  }

  loadEntityIconField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    Entity._Icons.sort(SortByKey('label'));

    let selIcons = Entity._Icons.filter(function(val){ return val.class === _this.props.entitiesState.entity.iconClass });
    let remIcons = Entity._Icons.filter(function(val){ return val.class !== _this.props.entitiesState.entity.iconClass });

    return(
      <div className="container">
        <Subheader>Entity Icons</Subheader>
        <List className="EntityIcons" style={listStyle}>
          
          {selIcons.concat(remIcons).map( (icon, index) => {
            if(icon.type !== this.EntityType){
              return false;
            }
            let className = ((icon.class === _this.props.entitiesState.entity.iconClass) ? ' active' : '');
            return (
              <ListItem className={className} key={index} data-icon={icon.class} 
                onTouchTap={this.changeIcon}
                primaryText={<div data-icon={icon.class}>{icon.label}</div>}  
                leftAvatar={<Avatar data-icon={icon.class} style={ {backgroundSize: '40px !important'} } className={'icon '+icon.class} />}
                
              />
            );
          })}
        </List>
      </div>
    );
  }

  loadPowersField(){
    let _this = this;
    let {entity} = this.props.entitiesState;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    let _powers = (this.EntityType === 'character') ? this.props.existingPowers : this.props.entitiesState.entity.powers;

    return(
      <div className="container">
        <Subheader>Powers</Subheader>
        <List className="EntityPowers" style={listStyle}>
          
          {_powers.map( (power, index) => {
            if(!entity.class){
              return (
                <ListItem  key={index} 
                  primaryText={<div >{power.name}</div>}  
                  leftAvatar={<Avatar className={'icon weapon_'+power.class} />}
                />
              );
            } else {
              let _found = entity.powers.findIndex(function(p) { 
                return power._id === p
              });

              if(Entity._Class[entity.class].name !== power.class.name){
                return false;
              }

              let className = (_found > -1) ? ' active' : '';

              return (
                <ListItem className={className} key={index} 
                  primaryText={<div >{power.name}</div>}  
                  leftAvatar={<Avatar className={'icon weapon_'+Powers.powerType[power.type].class} onTouchTap={_this.selectCharacterPower.bind(this, power)}/>}
                />
              );
            }
            
          })}
        </List>
      </div>
    );
  }

  loadWeaponsField(){
    let {entity} = this.props.entitiesState;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };
    let {availableWeapons} = this.props;

    let selWeapons = availableWeapons.filter(function(val){ 
      return entity.inventory.find(function(_item) { 
        return _item.item._id === val._id && _item.item.quantity > 0
      });

      // return entity.weapons.includes(val._id);
    });
    let remWeapons = this.props.availableWeapons.filter(function(val){ 
      let _found = entity.inventory.find(function(_item) { 
        let quantity = (_item.item === undefined) ? 0 : _item.item.quantity;
        return val._id === _item.item._id && quantity >= 1;
      });  
      if(_found === undefined) {
        return true;
      } else {
        return false;
      }
      return true;
    });
    let {boundEntityAC} = this.props;
    let _this = this;
    return(
      <div className="container" ref={(list) => { this.weaponField = list; }}>
        <Subheader>Weapons</Subheader>
        <List className="EntityWeapons" style={listStyle} >
          {selWeapons.concat(remWeapons).map( (weapon, index) => {
            let _found = entity.inventory.findIndex(function(w) { 
              return w.item._id === weapon._id && w.item.quantity > 0
            });
            let className = (_found > -1) ? ' active' : '';
            let weapon_icon = (weapon.weapon.type !== undefined) ? `weapon_${weapon.weapon.type.toLowerCase()}` : '';
            //

            {/* onMouseEnter={(e,i,v) => { 
                  boundEntityAC.updateMouseover(weapon, 'weapon', e) 
                } } 
                onMouseOut={(e,i,v) => { 
                  boundEntityAC.updateMouseover(false, false, e) 
                } } */}


            return (
              <ListItem className={className} key={index}  
                onTouchTap={_this.selectWeapon.bind(_this, weapon._id)}
                primaryText={<div >{weapon.name}</div>}  
                leftAvatar={<Avatar className={'icon '+weapon_icon} />}

              />
            );
          })}
        </List>
      </div>
    );
  }

  loadShieldField = () => {
    let {entity} = this.props.entitiesState;

    if(this.EntityType === 'character'){
      return false;
    }

    let regularShields = Gear.regularShields(this.props.availableGear);
    
    let entityShield = Gear.getEntityShield (entity.inventory);
    if(entityShield === undefined){
      entityShield = {item: {_id: false}};
    }
    let boundEntityAC = this.boundEntityAC;

    return(
      <div className="shields"> 
        <Subheader>Shield</Subheader> 
        {regularShields.map( (shield, index) => { 
          return ( 
            <Toggle key={index} 
              label={shield.name} 
              toggled={ entityShield.item._id === shield._id } 
              onToggle={(e, v) => { 
                let bolFound = false;
                shield.equipped = (v) ? true : false;
                let _inventory = entity.inventory.map( invt => {
                  if(invt.category.toLowerCase() === 'shield'){
                    if(invt.item._id === shield._id && v){
                      invt.item.equipped = true;
                      bolFound = true;
                    } else {
                      invt.item.equipped = false;
                    }
                  }
                  return invt;
                });
                if(!bolFound){
                  boundEntityAC.updateEntityInventory(entity, shield, 'add');
                } else {
                  boundEntityAC.updateEntityKey( 'inventory', _inventory );
                }
                boundEntityAC.updateEntityShield(shield);
              }}
            /> 
          ); 
          })} 
      </div> 

    );
  }

	render() {
    let {entity, points} = this.props.entitiesState;
    let abilities = entity.abilities;
    let AbilityMap = new Map(Object.entries(abilities));
    let _this = this;
    let saveEntities = (this.EntityType === 'monster') ? this.props.availableMonsters : this.props.availableCharacters;
    let formClassName = (this.EntityType === 'monster') ? 'AddMonster' : 'AddCharacter';

    let selectedStyle = Variables.getSelectListStyle(this.props.selectedEntity, saveEntities, true);

    
    let entityArmor = Gear.getEntityArmor(entity.inventory);
    entityArmor = (entityArmor === undefined) ? {_id: false} : entityArmor.item;

		return (
			<div className={`EntityForm inset ${formClassName}`}>
        <WeaponTooltip weaponField={this.weaponField} hoverObj={this.props.entitiesState.hoverObj} mouse={this.props.entitiesState.mouse} />
        <EntityChooser 
          onHandleSelectedEntity={this.handleSelectedEntity.bind(this)} 
          saveEntities={saveEntities} 
          EntityType={this.EntityType} 
          selectedStyle={selectedStyle} 
          selectedEntity={this.props.entitiesState.selectedEntity}
          boundEntityAC={this.props.boundEntityAC}
          hoverObj={this.props.entitiesState.hoverObj} 
          mouse={this.props.entitiesState.mouse}
        />        
				<TextField  floatingLabelText="Name" value={entity.name} name="name" onChange={this.handleChange} />
        <RaisedButton primary={true}
          label="Reset"
          onTouchTap={this.resetForm}
        />
        <br/>
				{(this.EntityType === 'character') ? this.loadRaceField() : ''}
        {(this.EntityType === 'character') ? this.loadClassField() : ''}
        {(this.EntityType === 'monster') ? this.loadRoleField() : ''}

        <SelectField className="bottomAlign"
          floatingLabelText="Size" 
          value={ Entity._Size.findIndex( (size, i) => {return entity.size === size.label } ) }  
          onChange={this.handleSizeChange} >
          {Entity._Size.map( (size, index) => (
            <MenuItem key={index} value={index} primaryText={`${size.label}`} />
          ))}
        </SelectField>
        {(this.EntityType === 'monster') ? this.loadArmorField() : ''}
        <br/>
        <TextField className="shortField" floatingLabelText="Level" type="number" value={entity.level} name="level" onChange={this.handleLevelChange} />
        {(this.EntityType === 'monster') ? this.loadXPField() : ''}
        <TextField className="shortField" floatingLabelText="HP"         type="number" value={entity.hp}         name="hp"         onChange={this.handleHPChange} />
        <TextField className="shortField" floatingLabelText="Speed"      type="number" value={entity.speed}      name="speed"      onChange={this.handleChange} />
        <div className="AbilityBox">
          <Subheader>Remaining Ability Points: {points.remainingPoints}</Subheader>
          <div className="AbilityList">
            {[...AbilityMap.entries()].map(function(a, i) {
              let attackMod = Entity.AttackModifier(entity.level, a[1].score);
              let RaceBonus = (Entity._Race[entity.race] === undefined || Entity._Race[entity.race].abilityMod[ a[0] ] === undefined) ? 0 : Entity._Race[entity.race].abilityMod[ a[0] ];
              let styleRaceBonus = (RaceBonus===0) ? {display:'none'} : {};

              return (
                <div className={a[0]+" Ability"} key={JSON.stringify(a[0])}>
                  <TextField className="miniField" floatingLabelText={a[0]}  type="number" 
                      value={ abilities[ a[0] ].score } name={a[0]} onChange={_this.changeAbility} />
                  <Chip tabIndex={-1} className="abilityChip">Atk: {(attackMod > 0 ? '+' : '') + attackMod}</Chip>    
                  <Chip tabIndex={-1} className="abilityChip">Abl: {(Entity.AbilityModifier(a[1].score) > 0 ? '+' : '') + Entity.AbilityModifier(a[1].score)}</Chip>
                  <Chip tabIndex={-1} className="abilityChip" style={styleRaceBonus }>Race: +{RaceBonus}</Chip>
                  
                </div>
              );
            })}
          </div>
        </div>
        <TextField className="shortField" floatingLabelText="Armor Class" type="number" value={entity.defense.armorClass.total} name="armorClass" onChange={this.handleArmorClassChange} />
        <TextField className="shortField" floatingLabelText="Fortitude" type="number" value={entity.defense.fortitude.total} name="fortitude" onChange={this.handleFortitudeChange} />
        <TextField className="shortField" floatingLabelText="Reflex" type="number" value={entity.defense.reflex.total} name="reflex" onChange={this.handleReflexChange} />
        <TextField className="shortField" floatingLabelText="Willpower" type="number" value={entity.defense.willpower.total} name="willpower" onChange={this.handleWillpowerChange} />
        <TextField className="shortField" floatingLabelText="Initiative" type="number" value={entity.initiative.total} name="initiative" onChange={this.handleInitiativeChange} />
        <div className="Lists">
          {this.loadEntityIconField()}
          {this.loadPowersField()}
          {(this.EntityType === 'monster') ? this.loadWeaponsField() : ''}
        </div>
        <br/>
        {this.loadShieldField()}
        {(this.EntityType === 'monster') ? this.loadPowersForm() : ''}   
        <br/><br/>
        <RaisedButton primary={true}
          label={(this.EntityType === 'character') ? 'Save Character' : 'Save Monster'}
          onTouchTap={this.handleEntitySave}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}         
        />
			</div>
		);
	}

}

export default EntityForm;