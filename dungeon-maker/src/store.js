import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import powersReducer from './reducers/powers-reducer';
import weaponsReducer from './reducers/weapons-reducer';
import dungeonsReducer from './reducers/dungeons-reducer';
import entitiesReducer from './reducers/entities-reducer';
import partiesReducer from './reducers/parties-reducer';
import gearReducer from './reducers/gear-reducer';
import { logger } from 'redux-logger';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  weaponsState: weaponsReducer,
  powersState: powersReducer,
  dungeonsState: dungeonsReducer,
  entitiesState: entitiesReducer,
  partiesState: partiesReducer,
  gearState: gearReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger, thunk)
);

export default store;