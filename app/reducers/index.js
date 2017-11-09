import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import audienceMessages from './audienceMessages';
import messages from './messages';
import bikes from './bikes';
import races from './races';
import racers from './racers';
import racerAttributes from './racerAttributes';
import showUndo from './showUndo';
import defaultRaceSettings from './defaultRaceSettings';

const rootReducer = combineReducers({
  audienceMessages,
  defaultRaceSettings,
  showUndo,
  messages,
  bikes,
  races,
  racers,
  racerAttributes,
  routing
});

export default rootReducer;
