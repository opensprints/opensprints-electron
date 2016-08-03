import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import navigationVisible from './navigationVisible';
import defaultSettings from './defaultSettings';
import bikes from './bikes';
import racers from './racers';

const rootReducer = combineReducers({
  navigationVisible,
  defaultSettings,
  bikes,
  racers,
  routing
});

export default rootReducer;
