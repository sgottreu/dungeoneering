import * as types from '../actions/action-types';

export function loadAvailableGear(gear) {
  return {
    type: types.LOAD_AVAILABLE_GEAR,
    gear: gear
  };
}
