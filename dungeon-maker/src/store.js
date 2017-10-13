import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import powersReducer from './reducers/powers-reducer';
import weaponsReducer from './reducers/weapons-reducer';
import dungeonsReducer from './reducers/dungeons-reducer';
import entitiesReducer from './reducers/entities-reducer';
import partiesReducer from './reducers/parties-reducer';
import encountersReducer from './reducers/encounters-reducer';
import gearReducer from './reducers/gear-reducer';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  weaponsState: weaponsReducer,
  powersState: powersReducer,
  dungeonsState: dungeonsReducer,
  entitiesState: entitiesReducer,
  partiesState: partiesReducer,
  encountersState: encountersReducer,
  gearState: gearReducer
});

const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
 const { logger } = require(`redux-logger`);

 middlewares.push(logger);
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

export default store;