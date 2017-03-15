import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Slots from './Slots';
import DungeonGrid from './DungeonGrid';
// import EntityTooltip from './EntityTooltip';
import DroppableList from './DroppableList';
import DraggableListItem from './DraggableListItem';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '../css/CreateEncounter.css';

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
    this.handleDungeonChoice = this.handleDungeonChoice.bind(this);
    this.getDroppedItem = this.getDroppedItem.bind(this);
    this.moveItem = this.moveItem.bind(this);

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
      },
      encounterDungeons: []
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

  moveItem = (index, dir) => {
    let from = index;
    let to = (dir === 'up') ? index-1 : index+1;

    let state = this.state;
    state.encounterDungeons.move(from, to);
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

  handleDungeonChoice(id, event){
		this.chooseDungeon(id);
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

  getDroppedItem = (item) => {
    let state = this.state;
    state.encounterDungeons.push( { _id: item._id, title: item.name } );
    console.log(state);
    this.setState(state);
  }

  render() {
    let {slots, selectedDungeon} = this.state;


    return (    	
      <div className="CreateEncounter">
        <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon} 
            onHandleEntityMouseOver={this.handleEntityMouseOver}
            onSetSlotDimensions={this.setSlotDimensions} />
        
            <List className="AvailableDungeons">
              {this.state.foundDungeonGrids.map( (grid, index) => {
                return (
                  <DraggableListItem key={index} onGetDroppedItem={this.getDroppedItem} onHandleDungeonChoice={this.handleDungeonChoice} name={grid.title} _id={grid._id}/>
                );
              })}
            </List>
            <DroppableList onMoveItem={this.moveItem} encounterDungeons={this.state.encounterDungeons} onHandleDungeonChoice={this.handleDungeonChoice}/>

      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CreateEncounter);