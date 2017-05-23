import React, { Component } from 'react';
import Slots from '../lib/Slots.js';
import DungeonGrid from './DungeonGrid';
import TileOptions from '../lib/TileOptions';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import TileDrawer from './TileDrawer';
import EntityTooltip from './EntityTooltip';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import EntityDrawer from './EntityDrawer';
import axios from 'axios';
import {Variables} from '../lib/Variables';
import * as dungeonsApi from '../api/dungeons-api';

import '../css/DungeonMaker.css';

class DungeonMaker extends Component {
  constructor(props){
    super(props);

    this.boundDungeonAC = this.props.boundDungeonAC;

    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.showDupeButton = this.showDupeButton.bind(this);
    this.duplicateDungeon = this.duplicateDungeon.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = { 
      drawers: {
        tile: false,
        dungeon: false,
        entity: false
      }
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;

    axios.get(`${Variables.host}/findEntities`)
    .then(res => {
      let state = _this.state;
      state.availableMonsters = res.data.monster;
      state.availableCharacters = res.data.character;
      _this.setState( state );
    });   

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  openDrawer = (name, status) => {
    let state = this.state;
    state.drawers[ name ] = (status === undefined) ? !state.drawers[ name ] : status;
    this.setState( state );
  }

  handleMyEvent(e) {
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    if(selectedEntity){
      this.boundDungeonAC.setSlotEntity(selectedEntity, slot);
    }

    if(selectedTile){
      let tileType = TileOptions.find( function(val) { return val.id === selectedTile });

      if(tileType === undefined){
        return false;
      } 
      this.boundDungeonAC.updateKey('selectedTile', tileType);
    }
  }

  showDupeButton = () => {
    return (
      <RaisedButton
          label="Duplicate Dungeon"secondary={true} 
					className="button"
          onTouchTap={this.duplicateDungeon}
        />
    );
  }

  duplicateDungeon = () => {
    let state = this.state;
    state.selectedDungeon = false;
    state._id = false;
    state.title = 'Copy of '+state.title;
    this.setState(state);
  }

  render() {
    let {slots, selectedTile, availableDungeons, selectedDungeon, selectedEntity, availableMonsters} = this.state;

    return (    	
	      <div className="DungeonMaker">
          <DungeonGrid 
            availableMonsters={availableMonsters}
            slots={slots} 
            onAddTile={this.boundDungeonAC.addTile} 
            selectedDungeon={selectedDungeon} 
            onHandleObjMouseOver={ this.boundDungeonAC.handleObjMouseOver }
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
          <EntityTooltip hoverObj={hoverObj} mouse={mouse} />
          <DungeonLoadDrawer 
            showSave={true} 
            onChooseDungeon={dungeonsApi.findDungeon} 
            selectedDungeon={selectedDungeon} 
            availableDungeons={availableDungeons} 
            dungeonTitle={this.state.title}
            onOpenDrawer={this.openDrawer}
            open={this.state.drawers.dungeon} 
          />
          {selectedDungeon !== false ? this.showDupeButton() : ''}
          <div>

            <br/>
            <TextField 
              hintText="Dungeon Name" 
              value={this.state.title} 
              onChange={(e) => { this.boundDungeonAC.updateDungeonKey('title', e.target.value) } } />
            <RaisedButton label="Save Dungeon" primary={true}  onClick={(e,i,v) => { dungeonsApi.saveDungeon(dungeon)}} />
          </div>
          <Snackbar
            open={open}
            message={this.state.snackbarMsg}
            autoHideDuration={4000}
            
          />

        </div>
    );
  }
}

export default DungeonMaker;

