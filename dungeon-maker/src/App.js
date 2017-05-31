import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Link } from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { Route } from 'react-router-dom';

import Home from './components/Home';

import RunEncounter from './components/RunEncounter';
import CreateEncounter from './components/CreateEncounter';
import AddMonstersContainer from './containers/add-monsters-container';

import AddWeaponsContainer from './containers/add-weapons-container';
import AddPowersContainer from './containers/add-powers-container';
import AddCharactersContainer from './containers/add-characters-container';
import AddDungeonsContainer from './containers/add-dungeons-container';
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
        <Route path="/runEncounter" component={RunEncounter}/>
        <Route path="/createEncounter" component={CreateEncounter}/>
        <Route path="/dungeonMaker" component={() => (<AddDungeonsContainer />)} />
        <Route path="/createParty" component={CreateParty}/>
        <Route path="/createCharacter" component={ () => (<AddCharactersContainer />) } />
        <Route path="/addMonster" component={ () => (<AddMonstersContainer />) } />
        <Route path="/addWeapon" component={() => (<AddWeaponsContainer />)} />
        <Route path="/addPowers" component={() => (<AddPowersContainer />)} />
      </div>

       
    );
  }
}


export default App;

