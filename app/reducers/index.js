import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import navigationVisible from './navigationVisible';
import defaultSettings from './defaultSettings';

const rootReducer = combineReducers({
  navigationVisible,
  defaultSettings,
  routing
});

export default rootReducer;
