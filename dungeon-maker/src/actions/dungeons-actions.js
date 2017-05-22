import * as types from '../actions/action-types';

export function loadDungeons(dungeons) {
  return {
    type: types.LOAD_DUNGEONS,
    dungeons: dungeons
  };
}

export function setDungeon(dungeon) {
  return {
    type: types.SET_DUNGEON,
    dungeon: dungeon
  };
}

export function updateKey(key, value) {
  return {
    type: types.UPDATE_KEY,
    key: key,
    value: value
  };
}

export function updateDungeonKey(key, value) {
  return {
    type: types.UPDATE_DUNGEON_KEY,
    key: key,
    value: value
  };
}

export function updateMouseover(entity, entityType, event) {
  return {
    type: types.UPDATE_MOUSEOVER,
    entityType: entityType,
    entity: entity,
    mouse: event
  };
}

export function setSlotEntity(id, slot) {
  return {
    type: types.SET_SLOT_ENTITY,
    id: id,
    slot: slot
  };
}

export function addTile(slot, event) {
  return {
    type: types.ADD_TILE,
    event: event,
    slot: slot
  };
}

export function duplicateDungeon(title) {
  return {
    type: types.DUPLICATE_DUNGEON,
    title: title
  };
}