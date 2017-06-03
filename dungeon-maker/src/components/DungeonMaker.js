import React, { Component } from 'react';

import DungeonGrid from './DungeonGrid';
import TileOptions from '../lib/TileOptions';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import TileDrawer from './TileDrawer';
import EntityTooltip from './EntityTooltip';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import EntityDrawer from './EntityDrawer';


import * as dungeonsApi from '../api/dungeons-api';

import '../css/DungeonMaker.css';

class DungeonMaker extends Component {
  constructor(props){
    super(props);

    this.boundDungeonAC = this.props.boundDungeonAC;
    this.boundEntityAC = this.props.boundEntityAC;
    this.openDrawer = this.openDrawer.bind(this);
    this.updateSnackBar = this.updateSnackBar.bind(this);

    this.state = { 
      drawers: {
        tile: false,
        dungeon: false,
        entity: false
      },
      snackbarOpen: false,
      snackbarMsg: ''
    };
  }

  openDrawer = (name, status) => {
    let state = this.state;
    state.drawers[ name ] = (status === undefined) ? !state.drawers[ name ] : status;
    this.setState( state );
  }

  updateSnackBar = (msg, open=false) => {
    let state = this.state;
    this.setState( { snackbarMsg: msg, snackbarOpen: open } );
  }

  render() {
    let { selectedTile, availableDungeons, selectedDungeon, selectedEntity, tileType, dungeon} = this.props.dungeonsState;
    let availableMonsters = this.props.availableMonsters
    let hideDupeButton = (selectedDungeon) ? '': ' hide ';
    let updateSnackBar = this.updateSnackBar;
    return (    	
	      <div className="DungeonMaker">
          <DungeonGrid 
            availableMonsters={availableMonsters}
            slots={dungeon.slots} 
            onAddTile={this.boundDungeonAC.addTile} 
            selectedDungeon={selectedDungeon} 
            onHandleObjMouseOver={ this.boundEntityAC.updateMouseover }
          />
          <TileDrawer 
            onOpenDrawer={this.openDrawer}
            open={this.state.drawers.tile} 
            tiles={TileOptions} 
            onUpdateKey={this.boundDungeonAC.updateKey} 
            selectedTile={selectedTile} 
            selectedEntity={selectedEntity}
          />
          <EntityDrawer 
            entityType="monster" 
            availableMonsters={availableMonsters} 
            onUpdateKey={this.boundDungeonAC.updateKey} 
            selectedTile={selectedTile} 
            selectedEntity={selectedEntity} 
            onOpenDrawer={this.openDrawer}
            open={this.state.drawers.entity} 
          />
          <EntityTooltip hoverObj={this.props.entitiesState.hoverObj} mouse={this.props.entitiesState.mouse} />
          <DungeonLoadDrawer 
            showSave={true} 
            onChooseDungeon={dungeonsApi.findDungeon} 
            selectedDungeon={selectedDungeon} 
            availableDungeons={availableDungeons} 
            dungeonTitle={this.state.title}
            onOpenDrawer={this.openDrawer}
            open={this.state.drawers.dungeon} 
          />
          <RaisedButton
            label="Duplicate Dungeon"secondary={true} 
            className={`button ${hideDupeButton}`}
            onTouchTap={ () => {
              this.boundDungeonAC.updateKey('selectedTile', tileType);
            }}
          />
          <div>

            <br/>
            <TextField 
              hintText="Dungeon Name" 
              floatingLabelText="Dungeon Name"
              value={dungeon.title} 
              onChange={(e) => { this.boundDungeonAC.updateDungeonKey('title', e.target.value); } } />
            <RaisedButton label="Save Dungeon" primary={true}  onClick={(e,i,v) => { 
                dungeonsApi.saveDungeon(dungeon).then( function(response){
                  updateSnackBar('Dungeon saved.', true)
                });
              }} />
          </div>
          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMsg}
            autoHideDuration={4000}
            
          />

        </div>
    );
  }
}

export default DungeonMaker;

