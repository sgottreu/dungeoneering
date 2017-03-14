import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import EntityTooltip from './EntityTooltip';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';

class CreateEncounter extends Component {
  constructor(props){
    super(props);

    this.selectTile = this.selectTile.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.addTile = this.addTile.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEntityMouseOver = this.handleEntityMouseOver.bind(this);
    this.setSlotDimensions = this.setSlotDimensions.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      selectedDungeon: false,
      hoverEntity: false,
      mouse: {
        clientX: false,
        clientY: false
      }
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;
    
    _Dungeon.findDungeonGrids(_this); 

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
  
  }

  handleEntityMouseOver = (entity, eve) => {
    let state = this.state;
    state.hoverEntity = entity;
    state.mouse.clientX = eve.clientX;
    state.mouse.clientY = eve.clientY;
    this.setState(state);
  }

  addTile(slot) {
  }

  handleTitleChange = (e) => {
  }

  saveDungeonGrid() {
    
  }

  setDungeon(selectedDungeon){
    let _this = this;
    axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}`)
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

  setSlotDimensions = (slot) => {
    let state = this.state;
      state.slots[ slot.dataset.slot - 1].left = slot.offsetLeft;
      state.slots[ slot.dataset.slot - 1].top = slot.offsetTop;
    this.setState(state);
  }

  render() {
    let {slots, foundDungeonGrids, selectedDungeon} = this.state;

    return (    	
      <div className="CreateEncounter">
        <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon} 
          onHandleEntityMouseOver={this.handleEntityMouseOver}
          onSetSlotDimensions={this.setSlotDimensions} />
        <EntityTooltip hoverEntity={this.state.hoverEntity} mouse={this.state.mouse} />
        <DungeonLoadDrawer onHandleTitleChange={this.handleTitleChange} onChooseDungeon={this.chooseDungeon} selectedDungeon={selectedDungeon} onSaveDungeonGrid={this.saveDungeonGrid} foundDungeonGrids={foundDungeonGrids}/>
      </div>
    );
  }
}

export default CreateEncounter;

