import React, { Component } from 'react';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import { EntityClass } from './EntityTemplate';
import { _Gear } from './_Gear';

import axios from 'axios';
import {Variables} from './Variables';

import '../css/CreateParty.css';

class CreateParty extends Component{

  constructor(props){
    super(props);

    this.handlePartyChange = this.handlePartyChange.bind(this);
    this.handleMemberBuyer = this.handleMemberBuyer.bind(this);
    this.selectMember = this.selectMember.bind(this);

    this.state = { 
      selectedParty: false,
      selectedMember: false,
      availableCharacters: [],
      availableParties: [],
      availableGear: _Gear,
      snackbarOpen: false,
      snackbarMsg: '',
      party: {
        _id: false,
        title: '',
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
  }

  handlePartyChange = (e) => {

  }

  handleMemberBuyer = (e, value) =>
  {
    let state = this.state;
    state.selectedMember = value;
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

  render() {
    let { party, selectedMember } = this.state;
    let spm = party.members.findIndex( (p) => { return p._id === selectedMember} );
    return (
      <div className="CreateParty">
        <SelectField  floatingLabelText={`Choose Party`} value={this.state.selectedParty} onChange={this.handlePartyChange} >
            {this.state.availableParties.map( (party, index) => {
                return (
                <MenuItem 
                  key={index} value={party._id} primaryText={`${party.name}`} />
                );
            })}
        </SelectField>

        <div className="Lists">
          
            <RadioButtonGroup name="selectedMembers" className="SelectedPartyMembers list" onChange={this.handleMemberBuyer} >
              {this.state.party.members.map( (member, index) => {
                let icon_class = EntityClass[ member.class ].name;
                return (
                    <RadioButton key={index} value={member._id} 
                      label={
                        <div style={ {marginLeft: '40px'} } key={index} onTouchTap={this.selectMember.bind(this, member)} >
                          <Avatar className={`icon ${icon_class.toLowerCase()}`} /> {member.name}
                        </div> 
                      }
                    />                    
                );
              })}
            </RadioButtonGroup>
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
        <List className="AvailableGear">
          {party.members[spm].inventory.map( (gear, index) => {
              return (
                <div key={index}
                  onTouchTap={this.selectMember.bind(this, gear)}
                  >
                  <TextField className="miniField"  type="number" 
                    value={ this.state.party.members[this.state.selectedMember] }  />
                  <span className="price">${gear.price}</span><span className="name">{gear.item}</span>
                </div>
                  
              );
            })}
            {this.state.availableGear.map( (gear, index) => {
              return (
                <div key={index}
                  onTouchTap={this.selectMember.bind(this, gear)}
                  >
                  <TextField className="miniField"  type="number" 
                    value={ this.state.party.members[this.state.selectedMember] }  />
                  <span className="price">${gear.price}</span><span className="name">{gear.item}</span>
                </div>
                  
              );
            })}
          </List>
      </div>
    );
  }
  

}

export default CreateParty;
