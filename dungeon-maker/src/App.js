import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import DungeonMaker from './components/DungeonMaker';
import RunEncounter from './components/RunEncounter';
import CreateEncounter from './components/CreateEncounter';
import AddMonster from './components/AddMonster';
import CreateCharacter from './components/CreateCharacter';
import AddWeapon from './components/AddWeapon';
import AddPowers from './components/AddPowers';
import CreateParty from './components/CreateParty';

import './css/App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);

    this.activateMenu = this.activateMenu.bind(this);

    this.state = {
      activeMenu: false,
      currentEncounter: false
    };
  }


  activateMenu = () => {
    this.setState({
      activeMenu: !this.state.activeMenu,
    });
  }

  render() {
    return (    	
      <div className="App">
       <AppBar className="AppBar"
        title='Dungeon Maker'
        onLeftIconButtonTouchTap={this.activateMenu}
        > 
        
        </AppBar>

        <Menu 
          className={'AppBarMenu '+(this.state.activeMenu ? 'active' : 'hide')}
          onEscKeyDown={this.activateMenu}
          >
          <Link to="/runEncounter"><MenuItem onTouchTap={this.activateMenu} primaryText="Run Encounter" /></Link>

          <Link to="/createEncounter"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Create Encounter" /></Link>
          <Link to="/dungeonMaker"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Dungeon Maker" /></Link>
          <Link to="/createParty" ><MenuItem onTouchTap={this.activateMenu} primaryText="Create Party" /></Link>
          <Link to="/createCharacter" ><MenuItem onTouchTap={this.activateMenu} primaryText="Create Character" /></Link>
          <Link to="/addMonster"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Monster" /></Link>
          <Link to="/addWeapon" ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Weapons" /></Link>
          <Link to="/addPowers" ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Powers" /></Link>
        
          
        </Menu>
        {this.props.children}
      	
        <Route exact path="/" component={Home} />
        <Route path="/runEncounter" component={() => (<RunEncounter  onSetEncounterTitle={this.setEncounterTitle} />)}/>
        <Route path="/createEncounter" component={CreateEncounter}/>
        <Route path="/dungeonMaker" component={() => (
          <DungeonMaker />)} />
        <Route path="/createParty" component={CreateParty}/>
        <Route path="/createCharacter" component={CreateCharacter}/>
        <Route path="/addMonster" component={AddMonster}/>
        <Route path="/addWeapon" component={AddWeapon}/>
        <Route path="/addPowers" component={AddPowers}/>
      </div>

       
    );
  }
}


export default App;

