import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import counter from './counter';
import navigationVisible from './navigationVisible';

const rootReducer = combineReducers({
  counter,
  navigationVisible,
  routing
});

export default rootReducer;
