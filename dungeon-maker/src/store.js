import { applyMiddleware, combineReducers, createStore } from 'redux';
import powersReducer from './reducers/powers-reducer';
import weaponsReducer from './reducers/weapons-reducer';
import dungeonsReducer from './reducers/dungeons-reducer';
import entitiesReducer from './reducers/entities-reducer';
import { logger } from 'redux-logger';

// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  weaponsState: weaponsReducer,
  powersState: powersReducer,
  dungeonsState: dungeonsReducer,
  entitiesState: entitiesReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(logger)
);

export default store;