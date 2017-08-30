import * as types from '../actions/action-types';

export function loadAvailableEncounters(encounters) {
  return {
    type: types.LOAD_AVAILABLE_ENCOUNTERS,
    encounters: encounters
  };
}

export function updateEncounter(encounter) {
  return {
    type: types.UPDATE_ENCOUNTER,
    encounter: encounter
  };
}

export function updateEncounterDungeons(dungeon) {
  return {
    type: types.UPDATE_ENCOUNTER_DUNGEONS,
    dungeon: dungeon
  };
}

export function updateEncounterName(name) {
  return {
    type: types.UPDATE_ENCOUNTER_NAME,
    name: name
  };
}
