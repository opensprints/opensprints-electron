import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import messages from './messages';
import bikes from './bikes';
import races from './races';
import racers from './racers';
import racerAttributes from './racerAttributes';
import showUndo from './showUndo';

const rootReducer = combineReducers({
  showUndo,
  messages,
  bikes,
  races,
  racers,
  racerAttributes,
  routing
});

export default rootReducer;
