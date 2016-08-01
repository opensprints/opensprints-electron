import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import navigationVisible from './navigationVisible';
import defaultSettings from './defaultSettings';
import bikes from './bikes';

const rootReducer = combineReducers({
  navigationVisible,
  defaultSettings,
  bikes,
  routing
});

export default rootReducer;
