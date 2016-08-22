import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import defaultSettings from './defaultSettings';
import bikes from './bikes';
import races from './races';
import racers from './racers';

const rootReducer = combineReducers({
  defaultSettings,
  bikes,
  races,
  racers,
  routing
});

export default rootReducer;
