import { combineReducers } from 'redux';

// Reducers
import powersReducer from './powers-reducer';

// Combine Reducers
var reducers = combineReducers({
    powersState: powersReducer,
});

export default reducers;