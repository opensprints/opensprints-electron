import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import navigationVisible from './navigationVisible';
import defaultSettings from './defaultSettings';

const rootReducer = combineReducers({
  counter,
  navigationVisible,
  defaultSettings,
  routing
});

export default rootReducer;
