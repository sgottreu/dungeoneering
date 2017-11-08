import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import EntityTooltip from './EntityTooltip';
import Toggle from 'material-ui/Toggle';
import uuidV4  from 'uuid/v4';

import * as Entity from '../lib/Entity';
import * as Gear from '../lib/Gear';

import {Variables} from '../lib/Variables';
import * as entitiesApi from '../api/entities-api';
import * as partiesApi from '../api/parties-api';

import '../css/CreateParty.css';

class CreateParty extends Component {

  constructor(props){
    super(props);

    this.boundEntityAC      = this.props.boundEntityAC;
    this.boundPartyAC       = this.props.boundPartyAC;

    this.handlePartyChange  = this.handlePartyChange.bind(this);
    this.handleMemberBuyer  = this.handleMemberBuyer.bind(this);
    this.addMember          = this.addMember.bind(this);
    this.loadInventoryItem  = this.loadInventoryItem.bind(this);
    this._updateInventory   = this._updateInventory.bind(this);
    this.handlePartySave    = this.handlePartySave.bind(this);
    this.handleNameChange   = this.handleNameChange.bind(this);
    this.handleCoinChange   = this.handleCoinChange.bind(this);
    this.handleEncumberedChange = this.handleEncumberedChange.bind(this);

    this.entityField = null;

    this.state = { 
      selectedParty: false,
      selectedMember: false,
      selectedCategory: false,
      snackbarOpen: false,
      snackbarMsg: ''
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    // entitiesApi.findCharacters();
    // partiesApi.findParties();
    // gearApi.findGear();
  }

  handlePartySave = () => {
    let state = this.state;
    let _this = this;

    let party = partiesApi.saveParty(this.props.partiesState.party);
    
    party.then(res => {

      state.snackbarOpen = true;
      state.snackbarMsg = 'Party successfully saved';
      state.selectedParty = false;
      state.selectedMember = false;
    
      _this.setState( state );
    });
  }

  handlePartyChange = (e, index) => {
    let state = this.state;
    let availableParties = this.props.partiesState.availableParties;
    state.selectedParty = availableParties[ index-1 ]._id;

    this.setState(state);

    this.boundPartyAC.updateParty( availableParties[ index-1 ] );
  }

  handleNameChange = (e) => {
    let party = this.props.partiesState.party;
    party.name = parseFloat(e.target.value, 10);
    this.boundPartyAC.updateParty(party);
  }

  handleCoinChange = (e) => {
    let entity = Variables.clone(this.props.entitiesState.entity);
    entity.coin_purse = e.target.value;
    this.boundEntityAC.updateKey( 'entity', entity );
  }

  handleEncumberedChange = (e) => {
    let entity = Variables.clone(this.props.entitiesState.entity);
    entity.encumbered = e.target.value;
    this.boundEntityAC.updateKey( 'entity', entity );
  }

  handleMemberBuyer = (e, value) =>
  {
    let state = this.state, _this = this;

    if(state.selectedMember){
      entitiesApi.saveEntity(this.props.entitiesState.entity).then(res => {
        state.snackbarMsg = 'Character Inventory Successfully updated';
        state.snackbarOpen = true;

        _this.setState(state);
        let _i = _this.props.availableCharacters.findIndex( c => { return c._id === value });
        _this.boundEntityAC.updateKey( 'entity', Variables.clone( _this.props.availableCharacters[ _i ] ) );
        _this.boundEntityAC.updateKey( 'selectedEntity', _i );
      });
    } else {
      state.selectedMember = value;
      _this.setState(state);

      let _i = _this.props.availableCharacters.findIndex( c => { return c._id === value });
      _this.boundEntityAC.updateKey( 'entity', Variables.clone( _this.props.availableCharacters[ _i ] ) );
      _this.boundEntityAC.updateKey( 'selectedEntity', _i );
    }

    
  }

  _updateInventory = (item, step) => {
    let _this = this;
    let { entity } = this.props.entitiesState;
    let carrying = Entity.checkCarryingCapacity(entity, item);
    let coin_purse = Entity.checkCoinPurse(entity.coin_purse, item);

    let state = this.state;

    if(carrying && coin_purse){
      this.boundEntityAC.updateEntityInventory(this.props.entitiesState.entity, item, step);
      state.snackbarMsg = 'Added to Inventory';
    } else {
      state.snackbarMsg = 'Unable to add to Inventory';
    }
    
    state.snackbarOpen = true;

    this.setState(state);
  }

  addMember = (character, e) => {
    this.boundPartyAC.updatePartyMember(character._id);
  }

  loadInventoryItem = (source, item, index, category, inventory, coin_purse) => {
    let tmpItem = Variables.clone(item);

    if(source === 'character'){
      tmpItem = Gear.findItem(item._id, this.props.availableGear);//Variables.clone(gear);
    }

    tmpItem.price = parseFloat(tmpItem.price, 10);
    tmpItem.quantity = (tmpItem.quantity !== undefined) ? tmpItem.quantity : 1;
    // console.log(item);
    inventory =  (inventory === undefined || inventory.item === undefined) ? inventory : inventory.item;
    let quantity = (inventory !== undefined && inventory.quantity !== undefined) ? inventory.quantity : 0;
    let equipped = (inventory !== undefined && inventory.equipped !== undefined) ? inventory.equipped : false;

    let totalWeight = tmpItem.weight * (quantity/tmpItem.quantity);

    let itemWeight = (totalWeight === 0) ? tmpItem.weight : tmpItem.weight + ' ('+(totalWeight)+')';

    let showEquipped = (['shield', 'armor'].includes(category.toLowerCase()) && item.character) ? '' : 'hide';

    let boundEntityAC = this.boundEntityAC;

    let _inventory = this.props.entitiesState.entity.inventory;
    _inventory = (_inventory === undefined) ? [] : _inventory;

    return (
      <TableRow key={index} style={ (quantity > 0) ? {background: 'rgba(0, 188, 212,.05)'} : {} } >
        <TableRowColumn style={{width: '200px'}}>{tmpItem.name}</TableRowColumn>
        <TableRowColumn>{Variables.toProperCase(category)}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right', width: '75px'}}>{tmpItem.price.toFixed(2)} gp</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right'}}>{itemWeight}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{tmpItem.quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center', width: '75px', padding: '1px 12px'}}>
          <Toggle
            className={showEquipped}
            label=""
            defaultToggled={equipped}
            name={'equipped_'+tmpItem._id} 
            onToggle={(e, v) => { 
              if(category.toLowerCase() === 'armor' || tmpItem.category.toLowerCase() === 'armor'){
                _inventory = _inventory.map( invt => {
                  if(invt.category.toLowerCase() === 'armor'){
                    invt.item.equipped = (invt.item._id === tmpItem._id && v) ? true : false;
                  }
                  return invt;
                });
                boundEntityAC.updateEntityKey( 'inventory', _inventory );
                boundEntityAC.updateEntityArmorclass();
              }
              if(category.toLowerCase() === 'shield' || tmpItem.category.toLowerCase() === 'shield'){
                _inventory = _inventory.map( invt => {
                  if(invt.category.toLowerCase() === 'shield'){
                    invt.item.equipped = (invt.item._id === tmpItem._id && v) ? true : false;
                    tmpItem = invt.item;
                  }
                  return invt;
                });
                boundEntityAC.updateEntityKey( 'inventory', _inventory );
                boundEntityAC.updateEntityShield(tmpItem);
              }
            }}
            
          />
        </TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <FloatingActionButton className="button" mini={true} secondary={true} 
            onTouchTap={this._updateInventory.bind(this, tmpItem, 'add')}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton className="button" mini={true} secondary={true} disabled={(quantity<=0)}
            onTouchTap={this._updateInventory.bind(this, tmpItem, 'remove') }>
            <ContentRemove />
          </FloatingActionButton>
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    let { party, availableParties } = this.props.partiesState;
    let availableCharacters = this.props.availableCharacters;
    let availableGear = this.props.availableGear;
    let { entity } = this.props.entitiesState;

    let spm = entity; //availableCharacters.find(member => { return member._id === selectedMember});
    spm = (spm === undefined) ? { inventory: [], coin_purse: 0, encumbered: 0 } : spm;
    spm.inventory.sort( (a, b) => { return a.item.name.toUpperCase() + b.item.name.toUpperCase() } );
    return (
      <div className="CreateParty inset">
        <SelectField  floatingLabelText={`Choose Party`} value={this.state.selectedParty} onChange={this.handlePartyChange} >
          <MenuItem key={uuidV4()} value={null} primaryText="" />
            {availableParties.map( (party, index) => {
                return (
                <MenuItem 
                  key={index} value={party._id} primaryText={`${party.name}`} />
                );
            })}
        </SelectField>
        <br/>
        <TextField  floatingLabelText="Party name" value={party.name} name="name" onChange={this.handleNameChange} />
        <div className="Lists">
          <div>
            <Subheader>Party Members</Subheader>
            <RadioButtonGroup name="selectedMembers" 
              className="SelectedPartyMembers list" onChange={this.handleMemberBuyer} 
              ref={(list) => { this.entityField = list; }}
            >
              {party.members.map( (member, index) => {
                
                let _i = availableCharacters.findIndex(function(c) { return c._id === member});    
                let icon_class = (_i === -1) ? '' : Entity._Class[ availableCharacters[_i].class ].name;
                let charName = (_i === -1) ? '' : availableCharacters[_i].name;
                let boundEntityAC = this.boundEntityAC;
                return (
                    <RadioButton key={index} value={member} 
                      onMouseEnter={(e,i,v) => { 
                        if(this.props.entitiesState.entity._id !== member){
                          return false;
                        }
                        boundEntityAC.updateMouseover(this.props.entitiesState.entity, 'entity', e) } 
                      } 
                      onMouseOut={(e,i,v) => { 
                        boundEntityAC.updateMouseover(false, false, e) } 
                      }
                      label={
                        <div style={ {marginLeft: '40px'} } key={index} >
                          <Avatar className={`icon ${icon_class.toLowerCase()}`} 
                            
                          /> {charName}
                        </div> 
                      }
                    />                    
                );
              })}
            </RadioButtonGroup>
          </div>
          <div>
            <Subheader>Available Characters</Subheader>
            <List className="AvailableMembers list">
              {availableCharacters.map( (character, index) => {
                let icon_class = Entity._Class[ character.class ].name;
                
                return (
                  <ListItem key={index}
                    onTouchTap={this.addMember.bind(this, character)}
                    primaryText={<div >{character.name}</div>}  
                    leftAvatar={
                      <Avatar className={`icon ${icon_class.toLowerCase()}`} />
                    }
                  />
                );
              })}
            </List>
          </div>
        </div>
        <div style={ {height: '85px'} }>
          <div className="coinPurse">
            <Subheader>Coin Purse</Subheader>
            <TextField className="shortField" type="text" value={parseFloat(spm.coin_purse, 10).toFixed(2)} name="coin_purse" onChange={this.handleCoinChange} />
          </div>
          <div className="carryingCapacity">
            <Subheader>Carrying Capacity</Subheader>
            <span className="value">{parseInt(spm.abilities.strength.score * 10,10)}</span>
          </div>
          
          <div className="inventoryWeight">
            <Subheader>Pack Weight</Subheader>          
            <TextField className="shortField" type="text" value={parseFloat(spm.encumbered,10)} name="encumbered" onChange={this.handleEncumberedChange} />
          </div>


        </div>
        <div className="">
            <SelectField className="bottomAlign" floatingLabelText="Category Filter" value={this.state.selectedCategory} 
              onChange={(e, i) => {
                let value = (i === 0) ? null : Gear.GearCategories[i-1];
                let state = Variables.clone(this.state);
                state.selectedCategory = value;

                this.setState(state);
              }
            } >
              <MenuItem key={null} value={false} primaryText="" />
              { Gear.GearCategories.map( (cat, index) => (
                <MenuItem key={index+1} value={`${cat}`} primaryText={`${cat}`} />
              ))
              }

            </SelectField>
        </div>
        <Table className="AvailableGear">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn style={{width: '200px'}}>Item</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn style={{width: '75px'}}>Price</TableHeaderColumn>
              <TableHeaderColumn>Weight</TableHeaderColumn>
              <TableHeaderColumn>Quantity</TableHeaderColumn>
              <TableHeaderColumn>In Inventory</TableHeaderColumn>
              <TableHeaderColumn style={{width: '75px', padding: '1px 12px'}}>Equipped</TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {spm.inventory.map( (gear, index) => {
              let inventory = spm.inventory.find(inv => { 
                if(inv.item === undefined){
                  inv.character = true;
                } else {
                  inv.item.character = true;
                }
                let item_name = (inv.item === undefined) ? inv.name : inv.item.name;
                let gear_name = (gear.item === undefined) ? gear.name : gear.item.name;
                return item_name === gear_name && inv.item.quantity > 0;
              });
              var g;


              if(inventory === undefined){
                return false;
              }
              let _g = Gear.findItem(gear.item._id, availableGear);//Variables.clone(gear);
              g = Variables.clone(gear);
              g.item.quantity = _g.quantity;

              if(g.item.quantity === undefined){
                g.item.quantity = 1;
              }
              

              return this.loadInventoryItem('character', g.item, index, g.category, inventory, spm.coin_purse);   
                    
            })}
            {availableGear.map( (gear2, index) => {
              if(this.state.selectedCategory !== gear2.category){
                if(this.state.selectedCategory){
                  return false;
                }
              }
              gear2.character = false;

              let inventory = spm.inventory.find(inv => { 
                return inv.item.name === gear2.name
              });

              if(inventory !== undefined){
                if(inventory.item.quantity > 0){
                  return false;
                }
                
              }
              return this.loadInventoryItem('shop', gear2, index, gear2.category, inventory, spm.coin_purse);   
            })}
          </TableBody>
        </Table>
        <br/>
        <br/>
        <RaisedButton primary={true}
          label={'Save Party'}
          onTouchTap={this.handlePartySave}
        />
        <RaisedButton primary={true}
          label={'Save Member Inventory'}
          style={{marginLeft:'20px'}}
          onTouchTap={() => 
            {
              let updateSnackBar = this.updateSnackBar;
              if(entity.uuid === undefined){
                entity.uuid = uuidV4();
              }
              entitiesApi.saveEntity(entity)
              .then( function(response){
                updateSnackBar('Character saved.', true);
              });
            }
          }
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}   
          onRequestClose={() => {
            let state = this.state;
            state.snackbarMsg = '';          
            state.snackbarOpen = false;
            this.setState(state);
            }
          } 
        />
        <EntityTooltip entityField={this.entityField} hoverObj={this.props.entitiesState.hoverObj} mouse={this.props.entitiesState.mouse} />
      </div>
    );
  }
  

}

export default CreateParty;
