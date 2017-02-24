import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import DungeonMaker from './DungeonMaker';
import RunEncounter from './RunEncounter';
import AddMonster from './AddMonster';
import CreateCharacter from './CreateCharacter';

class TabbedApp extends Component {
  constructor(props){
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.loadDungeonMaker = this.loadDungeonMaker.bind(this);
    this.loadRunEncounter = this.loadRunEncounter.bind(this);
    this.loadAddMonster = this.loadAddMonster.bind(this);
    this.loadCreateCharacter = this.loadCreateCharacter.bind(this);

    this.state = {
      selectedTab: 'runEncounter',
    };
  }

  handleChange = (value) => {
    this.setState({
      selectedTab: value,
    });
  }

  loadRunEncounter(){
    if(this.state.selectedTab === 'runEncounter'){
      return (<RunEncounter />);
    }
    return false;
  }

  loadDungeonMaker(){
    if(this.state.selectedTab === 'dungeonMaker'){
      return (<DungeonMaker />);
    }
    return false;
  }

  loadAddMonster(){
    if(this.state.selectedTab === 'addMonster'){
      return (<AddMonster />);
    }
    return false;
  }

  loadCreateCharacter(){
    if(this.state.selectedTab === 'createCharacter'){
      return (<CreateCharacter />);
    }
    return false;
  }

  render() {
    return (    	
      <div className="TabbedApp">
        <Tabs value={this.state.selectedTab} onChange={this.handleChange}>
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
        </Tabs>
      	
        
      </div>
    );
  }
}

export default TabbedApp;

