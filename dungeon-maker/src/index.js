import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import Home from './components/Home';
import DungeonMaker from './components/DungeonMaker';
import RunEncounter from './components/RunEncounter';
import CreateEncounter from './components/CreateEncounter';
import AddMonster from './components/AddMonster';
import CreateCharacter from './components/CreateCharacter';
import AddWeapon from './components/AddWeapon';
import AddPowers from './components/AddPowers';

import './css/index.css';
import './css/font-awesome.min.css';

ReactDOM.render((
  <Router >
    <MuiThemeProvider>
      <App>
        <Route exact path="/" component={Home} />
        <Route path="/runEncounter" component={RunEncounter}/>
        <Route path="/createEncounter" component={CreateEncounter}/>
        <Route path="/dungeonMaker" component={DungeonMaker}/>
        <Route path="/createCharacter" component={CreateCharacter}/>
        <Route path="/addMonster" component={AddMonster}/>
        <Route path="/addWeapon" component={AddWeapon}/>
        <Route path="/addPowers" component={AddPowers}/>
      </App> 
    </MuiThemeProvider>
  </Router>
), document.getElementById('root'));

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};