import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';


import DungeonMaker from './components/DungeonMaker';
import RunEncounter from './components/RunEncounter';
import AddMonster from './components/AddMonster';
import CreateCharacter from './components/CreateCharacter';
import AddWeapon from './components/AddWeapon';
import AddPowers from './components/AddPowers';
import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

// import '../css/TabbedApp.css';

// import TabbedApp from './components/TabbedApp';
import './css/App.css';

injectTapEventPlugin();

class App extends Component {
  constructor(props){
    super(props);

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

  render() {
    return (    	
      <div className="App">
       <AppBar className="AppBar"
        title="Dungeon Maker"
        onLeftIconButtonTouchTap={this.activateMenu}
        /> 

      <Menu 
        className={'AppBarMenu '+(this.state.activeMenu ? 'active' : 'hide')}
        onEscKeyDown={this.activateMenu}
        >
        <Link to="/runEncounter"><MenuItem onTouchTap={this.activateMenu} primaryText="Run Encounter" /></Link>

        <Link to="/createEncounter"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Create Encounter" /></Link>
        <Link to="/dungeonMaker"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Dungeon Maker" /></Link>
        <Link to="/createCharacter" ><MenuItem onTouchTap={this.activateMenu} primaryText="Create Character" /></Link>
        <Link to="/addMonster"  ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Monster" /></Link>
        <Link to="/addWeapon" ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Weapons" /></Link>
        <Link to="/addPowers" ><MenuItem onTouchTap={this.activateMenu} primaryText="Add Powers" /></Link>
      
        
      </Menu>
        {this.props.children}
      	
        
      </div>
    );
  }
}


export default App;

