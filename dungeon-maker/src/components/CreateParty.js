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

import { EntityClass, calcWeightPrice } from './EntityTemplate';
// import { _Gear } from './_Gear';

import axios from 'axios';
import {Variables} from './Variables';

import '../css/CreateParty.css';

class CreateParty extends Component{

  constructor(props){
    super(props);

    this.initialPartyState = { 
      _id: false,
      name: '',
      _type: 'party',
      members: []
      
    };

    this.handlePartyChange  = this.handlePartyChange.bind(this);
    this.handleMemberBuyer  = this.handleMemberBuyer.bind(this);
    this.selectMember       = this.selectMember.bind(this);
    this.loadInventoryItem  = this.loadInventoryItem.bind(this);
    this._updateInventory   = this._updateInventory.bind(this);
    this.handlePartySave    = this.handlePartySave.bind(this);
    this.handleNameChange   = this.handleNameChange.bind(this);
    this.sortGear           = this.sortGear.bind(this);

    this.state = { 
      selectedParty: false,
      selectedMember: false,
      availableCharacters: [],
      availableParties: [],
      availableGear: [],
      snackbarOpen: false,
      snackbarMsg: '',
      party: {
        _id: false,
        name: '',
        _type: 'party',
        members: []
      }
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;

    axios.get(`${Variables.host}/findEntities?type=character`)
    .then(res => {
      let state = _this.state;
      state.availableCharacters = res.data.character;
      _this.setState( state );
    }); 

    axios.get(`${Variables.host}/findParties`)
    .then(res => {
      let state = _this.state;
      state.availableParties = res.data;
      _this.setState( state );
    }); 

    axios.get(`${Variables.host}/findGear`)
    .then(res => {
      let state = _this.state;
      state.availableGear = res.data;
      _this.setState( state );
    });
  }

  handlePartySave = () => {
    let state = this.state;
    let _this = this;

    axios.post(`${Variables.host}/saveParty`, state.party)
    .then(res => {
      let _id = res.data._id;
      state.snackbarOpen = true;
      state.snackbarMsg = 'Party successfully saved';
      state.party = Variables.clone(_this.initialPartyState);
      state.selectedParty = false;
      state.selectedMember = false;

      let _i = state.availableParties.find(p => { return p._id === res.data._id});
      if(_i !== -1){
         state.availableParties[_i] = res.data;
      } else {
        state.availableParties.push(res.data);
      }
     
      _this.setState( state );
    });
  }

  handlePartyChange = (e, index) => {
    let state = this.state;
    state.selectedParty = state.availableParties[ index ]._id;
    state.party = state.availableParties[ index ];
    this.setState(state);
  }

  handleNameChange = (e) => {
    let state = this.state;
    state.party.name = e.target.value;
    this.setState(state);
  }

  handleMemberBuyer = (e, value) =>
  {
    let state = this.state;
    state.selectedMember = value;
    this.setState(state);
  }

  _updateInventory = (item, category, bolRemove, bolAddItem) => {
    let state = this.state;
    let _i = state.party.members.findIndex(member => { return member._id === this.state.selectedMember});
    state.party.members[_i] = calcWeightPrice(state.party.members[_i], item, category, bolRemove, bolAddItem);

    this.setState(state);
  }

  selectMember = (character, e) => {
    let state = this.state;
    let _i = state.party.members.find( (c, i) => { return c._id === character._id } );
    
    if(_i !== undefined ) {
      state.party.members.splice(_i, 1);
    } else {
      state.party.members.push(character);
    }

    this.setState(state);
  }

  loadInventoryItem = (item, index, category, inventory, coin_purse) => {
    let tmpItem = Variables.clone(item);
    tmpItem.price = parseFloat(tmpItem.price, 10);
    tmpItem.quantity = (tmpItem.quantity !== undefined) ? tmpItem.quantity : 1;

    inventory =  (inventory === undefined || inventory.item === undefined) ? inventory : inventory.item;
    let quantity = (inventory !== undefined && inventory.quantity !== undefined) ? inventory.quantity : 0;
    let bolNonAddable = (['shield', 'armor'].includes(category)) ? true : false;
    bolNonAddable = (!bolNonAddable && tmpItem.price > coin_purse) ? true : bolNonAddable;
    return (
      <TableRow key={index} style={ (quantity > 0) ? {background: 'rgba(0, 188, 212,.05)'} : {} } >
        <TableRowColumn>{tmpItem.name}</TableRowColumn>
        <TableRowColumn>{Variables.toProperCase(category)}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'right', width: '50px'}}>{tmpItem.price.toFixed(2)} gp</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{tmpItem.quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>{quantity}</TableRowColumn>
        <TableRowColumn style={{textAlign: 'center'}}>
          <FloatingActionButton className="button" mini={true} secondary={true} disabled={bolNonAddable}
            onTouchTap={this._updateInventory.bind(this, tmpItem, category, false, true)}>
            <ContentAdd />
          </FloatingActionButton>
          <FloatingActionButton className="button" mini={true} secondary={true} 
            onTouchTap={this._updateInventory.bind(this, tmpItem, category, (['shield', 'armor', 'weapons'].includes(category)) ? 'category' : 'item', false) }>
            <ContentRemove />
          </FloatingActionButton>
        </TableRowColumn>
      </TableRow>
    );
  }

  sortGear = (gear, inventory) => {
    gear.sort(function(a, b) {
      var nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else {
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });
    return gear;
  }

  render() {
    let { party, selectedMember, availableGear } = this.state;
    let spm = party.members.find(member => { return member._id === selectedMember});
    spm = (spm === undefined) ? { inventory: [], coin_purse: 0, encumbered: 0 } : spm;
    spm.inventory.sort( (a, b) => { return a.item.name.toUpperCase() + b.item.name.toUpperCase() } );
    availableGear = this.sortGear(availableGear, spm.inventory);
    return (
      <div className="CreateParty inset">
        <SelectField  floatingLabelText={`Choose Party`} value={this.state.selectedParty} onChange={this.handlePartyChange} >
            {this.state.availableParties.map( (party, index) => {
                return (
                <MenuItem 
                  key={index} value={party._id} primaryText={`${party.name}`} />
                );
            })}
        </SelectField>
        <br/>
        <TextField  floatingLabelText="Party name" value={this.state.party.name} name="name" onChange={this.handleNameChange} />
        <div className="Lists">
          <div>
            <Subheader>Party Members</Subheader>
            <RadioButtonGroup name="selectedMembers" className="SelectedPartyMembers list" onChange={this.handleMemberBuyer} >
              {this.state.party.members.map( (member, index) => {
                let icon_class = EntityClass[ member.class ].name;
                return (
                    <RadioButton key={index} value={member._id} 
                      label={
                        <div style={ {marginLeft: '40px'} } key={index} >
                          <Avatar className={`icon ${icon_class.toLowerCase()}`} /> {member.name}
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
              {this.state.availableCharacters.map( (character, index) => {
                let icon_class = EntityClass[ character.class ].name;
                return (
                  <ListItem key={index}
                    onTouchTap={this.selectMember.bind(this, character)}
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
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Item</TableHeaderColumn>
              <TableHeaderColumn>Category</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
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
                return item_name === gear_name
              });
              var g;
              if( !['weapons', 'shield', 'armor'].includes(gear.category) ){
                return false;
              } else {
                g = Variables.clone(gear);
                g.item.quantity = 1;
                return this.loadInventoryItem(g.item, index, g.category, inventory, spm.coin_purse);   
              }       
                                     
            })}
            {availableGear.map( (gear2, index) => {
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
