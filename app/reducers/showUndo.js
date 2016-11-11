import { ActionTypes } from 'redux-undo';
import { REMOVE_RACERS } from '../actions/racer';

export default function showUndo(state = false, action) {
  switch (action.type) {
    case ActionTypes.UNDO:
      return false;
    case REMOVE_RACERS:
      return true;
    default:
      return state;
  }
}
