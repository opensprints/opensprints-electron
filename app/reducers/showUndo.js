import { ActionTypes } from 'redux-undo';
import { REMOVE_RACERS } from '../actions/racer';
import { HIDE_UNDO } from '../actions/showUndo';

export default function showUndo(state = false, action) {
  switch (action.type) {
    case ActionTypes.UNDO:
      return false;
    case REMOVE_RACERS:
      return true;
    case HIDE_UNDO:
      return false;
    default:
      return state;
  }
}
