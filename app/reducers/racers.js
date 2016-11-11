import undoable from 'redux-undo';
import { ADD_RACER, REMOVE_RACERS } from '../actions/racer';

const racers = (state = [], action) => {
  switch (action.type) {
    case ADD_RACER:
      return [
        ...state,
        action.racer
      ];
    case REMOVE_RACERS: {
      return state.filter((racer) => action.ids.indexOf(racer.id) === -1);
    }
    default:
      return state;
  }
};
const undoableRacers = undoable(racers);
export default undoableRacers;
