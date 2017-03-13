import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import DungeonMaker from './DungeonMaker';
import RunEncounter from './RunEncounter';
import AddMonster from './AddMonster';
import CreateCharacter from './CreateCharacter';
import AddWeapon from './AddWeapon';
import AddPowers from './AddPowers';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

import '../css/TabbedApp.css';

class TabbedApp extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.loadDungeonMaker = this.loadDungeonMaker.bind(this);
    this.loadRunEncounter = this.loadRunEncounter.bind(this);
    this.loadAddMonster = this.loadAddMonster.bind(this);
    this.loadCreateCharacter = this.loadCreateCharacter.bind(this);
    this.loadAddWeapon = this.loadAddWeapon.bind(this);
    this.loadAddPowers = this.loadAddPowers.bind(this);

    this.activateMenu = this.activateMenu.bind(this);

    this.state = {
      activeMenu: false,
      selectedTab: 'AddPowers',
    };
  }

  activateMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  handleChange = (value) => {
    this.setState({
      selectedTab: value,
    });
  }

  loadRunEncounter(){
    if(this.state.selectedTab === 'runEncounter'){
      return (<RunEncounter selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }

  loadDungeonMaker(){
    if(this.state.selectedTab === 'dungeonMaker'){
      return (<DungeonMaker selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }

  loadAddMonster(){
    if(this.state.selectedTab === 'addMonster'){
      return (<AddMonster selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }

  loadCreateCharacter(){
    if(this.state.selectedTab === 'createCharacter'){
      return (<CreateCharacter selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }
  loadAddWeapon(){
    if(this.state.selectedTab === 'addWeapon'){
      return (<AddWeapon selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }
  loadAddPowers(){
    if(this.state.selectedTab === 'AddPowers'){
      return (<AddPowers selectedTab={this.state.selectedTab}/>);
    }
    return false;
  }

  render() {
    return (    	
      <div className="TabbedApp">
       <AppBar
        title="Dungeon Maker"
        onLeftIconButtonTouchTap={this.activateMenu}
        /> 

      <Menu 
        className={'AppBarMenu '+(this.state.activeMenu ? 'active' : 'hide')}
        onEscKeyDown={this.activateMenu}
        >
        <MenuItem primaryText="Run Encounter" />
        <MenuItem primaryText="Create Encounter" />
        <MenuItem primaryText="Dungeon Maker" />
        <MenuItem primaryText="Create Character" />
        <MenuItem primaryText="Add Monster" />
        <MenuItem primaryText="Add Powers" />
      </Menu>
        {/*<Tabs value={this.state.selectedTab} onChange={this.handleChange}>
          <Tab label="Run Encounter" value="runEncounter">
            {this.loadRunEncounter()}
          </Tab>
          <Tab label="Dungeon Maker" value="dungeonMaker">
           {this.loadDungeonMaker()}
          </Tab>     
          <Tab label="Create Character" value="createCharacter">
            {this.loadCreateCharacter()}
          </Tab>
          <Tab label="Add Monster" value="addMonster">
            {this.loadAddMonster()}
          </Tab>
          <Tab label="Add Powers" value="AddPowers">
            {this.loadAddPowers()}
          </Tab>

        </Tabs>*/}
      	
        
      </div>
    );
          // <Tab label="Add Weapon" value="addWeapon">
          //   {this.loadAddWeapon()}
          // </Tab>

  }
}

export default TabbedApp;

