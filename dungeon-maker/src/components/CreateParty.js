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
import SortByKey from '../lib/SortByKey';

import * as Entity from '../lib/Entity';

import axios from 'axios';
import {Variables} from '../lib/Variables';
import * as entitiesApi from '../api/entities-api';
import * as partiesApi from '../api/parties-api';
import * as gearApi from '../api/gear-api';

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

    this.state = { 
      selectedParty: false,
      selectedMember: false,
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
      let _id = res.data._id;
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
    state.selectedParty = availableParties[ index ]._id;

    this.setState(state);

    this.boundPartyAC.updateParty( availableParties[ index ] );
  }

  handleNameChange = (e) => {
    let party = this.props.partiesState.party;
    party.name = e.target.value;
    this.boundPartyAC.updateParty(party);
  }

  handleMemberBuyer = (e, value) =>
  {
    let state = this.state, _this = this;

    if(state.selectedMember){
      entitiesApi.saveEntity(this.props.entitiesState.entity).then(res => {
        state.snackbarMsg = 'Inventory Successfully updated';
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
    this.boundEntityAC.updateEntityInventory(this.props.entitiesState.entity, item, step);
  }

  addMember = (character, e) => {
    this.boundPartyAC.updatePartyMember(character._id);
  }

  loadInventoryItem = (item, index, category, inventory, coin_purse) => {
    let tmpItem = Variables.clone(item);
    tmpItem.price = parseFloat(tmpItem.price, 10);
    tmpItem.quantity = (tmpItem.quantity !== undefined) ? tmpItem.quantity : 1;

    inventory =  (inventory === undefined || inventory.item === undefined) ? inventory : inventory.item;
    let quantity = (inventory !== undefined && inventory.quantity !== undefined) ? inventory.quantity : 0;
    let bolNonAddable = (['shield', 'armor'].includes(category)) ? true : false;
    bolNonAddable = (!bolNonAddable && tmpItem.price > coin_purse) ? true : bolNonAddable;

    let totalWeight = tmpItem.weight * (quantity/tmpItem.quantity);

    return (
      <TableRow key={index} style={ (quantity > 0) ? {background: 'rgba(0, 188, 212,.05)'} : {} } >
        <TableRowColumn style={{width: '200px'}}>{tmpItem.name}</TableRowColumn>
        <TableRowColumn>{Variables.toProperCase(category)}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right', width: '75px'}}>{tmpItem.price.toFixed(2)} gp</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right'}}>{tmpItem.weight + '('+(totalWeight)+')'}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{tmpItem.quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <FloatingActionButton className="button" mini={true} secondary={true} disabled={bolNonAddable}
            onTouchTap={this._updateInventory.bind(this, tmpItem, 'add')}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton className="button" mini={true} secondary={true} 
            onTouchTap={this._updateInventory.bind(this, tmpItem, 'remove') }>
            <ContentRemove />
          </FloatingActionButton>
        </TableRowColumn>
      </TableRow>
    );
  }

  render() {
    let { selectedMember } = this.state;
    let { party, availableParties } = this.props.partiesState;
    let availableCharacters = this.props.availableCharacters;
    let { entity } = this.props.entitiesState;

    let spm = entity; //availableCharacters.find(member => { return member._id === selectedMember});
    spm = (spm === undefined) ? { inventory: [], coin_purse: 0, encumbered: 0 } : spm;
    spm.inventory.sort( (a, b) => { return a.item.name.toUpperCase() + b.item.name.toUpperCase() } );
    return (
      <div className="CreateParty inset">
        <SelectField  floatingLabelText={`Choose Party`} value={this.state.selectedParty} onChange={this.handlePartyChange} >
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
            <RadioButtonGroup name="selectedMembers" className="SelectedPartyMembers list" onChange={this.handleMemberBuyer} >
              {party.members.map( (member, index) => {
                let _i = availableCharacters.findIndex(function(c) { return c._id === member});    
                let icon_class = Entity._Class[ availableCharacters[_i].class ].name;
                return (
                    <RadioButton key={index} value={member} 
                      label={
                        <div style={ {marginLeft: '40px'} } key={index} >
                          <Avatar className={`icon ${icon_class.toLowerCase()}`} /> {availableCharacters[_i].name}
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
                    leftAvatar={<Avatar className={`icon ${icon_class.toLowerCase()}`} />}
                  />
                );
              })}
            </List>
          </div>
        </div>
        <div style={ {height: '75px'} }>
          <div className="coinPurse">
            <Subheader>Coin Purse</Subheader>
            <span className="value">{parseFloat(spm.coin_purse,10).toFixed(2)}</span>
          </div>
          <div className="inventoryWeight">
            <Subheader>Pack Weight</Subheader>
            <span className="value">{parseInt(spm.encumbered,10)}</span>
          </div>
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
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} >
            {spm.inventory.map( (gear, index) => {
              let inventory = spm.inventory.find(inv => { 
                let item_name = (inv.item === undefined) ? inv.name : inv.item.name;
                let gear_name = (gear.item === undefined) ? gear.name : gear.item.name;
                return item_name === gear_name && inv.item.quantity > 0;
              });
              var g;
              if( !['weapons', 'shield', 'armor'].includes(gear.category) ){
                return false;
              } else {
                if(inventory === undefined){
                  return false;
                }
                g = Variables.clone(gear);
                g.item.quantity = 1;
                return this.loadInventoryItem(g.item, index, g.category, inventory, spm.coin_purse);   
              }       
                                     
            })}
            {this.props.availableGear.map( (gear2, index) => {
              let inventory = spm.inventory.find(inv => { return inv.item.name === gear2.name});
              return this.loadInventoryItem(gear2, index, gear2.category, inventory, spm.coin_purse);   
            })}
          </TableBody>
        </Table>
        <br/>
        <br/>
        <RaisedButton primary={true}
          label={'Save Party'}
          onTouchTap={this.handlePartySave}
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

export default CreateParty;
