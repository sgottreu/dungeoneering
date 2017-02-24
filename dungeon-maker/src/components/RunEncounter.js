import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import axios from 'axios';
import {Variables} from './Variables';


class RunEncounter extends Component {
  constructor(props){
    super(props);

    this.selectTile = this.selectTile.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.addTile = this.addTile.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      selectedDungeon: false
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;

    axios.get(`${Variables.host}/findDungeonGrids`)
    .then(res => {
      let state = _this.state;
      state.foundDungeonGrids = res.data;
      _this.setState( state );
    });      

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
  
  }

  addTile(slot) {
  }

  handleTitleChange = (e) => {
  }

  saveDungeonGrid() {
    
  }

  setDungeon(selectedDungeon){
    let _this = this;
    axios.get(`${Variables.host}/findDungeonGrid?encounter_id=${selectedDungeon}`)
      .then(res => {
        let state = _this.state;
        state.slots = res.data.slots;
        _this.setState(state);
      });
  }

  chooseDungeon(id){
    let state = this.state;
    state.selectedDungeon = id;
    this.setState( state );
  }

  selectTile(id) {
    let selectedTile = this.state.selectedTile;
    this.setState( { selectedTile: (selectedTile === id) ? '' : id });
  }

  render() {
    let {slots, foundDungeonGrids, selectedDungeon} = this.state;

    return (    	
	      <div className="RunEncounter">
          <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon}/>
          <DungeonLoadDrawer onHandleTitleChange={this.handleTitleChange} onChooseDungeon={this.chooseDungeon} selectedDungeon={selectedDungeon} onSaveDungeonGrid={this.saveDungeonGrid} foundDungeonGrids={foundDungeonGrids}/>
	      </div>
    );
  }
}

export default RunEncounter;

