import undoable from 'redux-undo';
import { ADD_RACER, REMOVE_RACERS, EDIT_RACER } from '../actions/racer';

const racers = (state = [], action) => {
  switch (action.type) {
    case ADD_RACER:
      return [
        ...state,
        action.racer
      ];

    case REMOVE_RACERS: {
      return state.filter(racer => action.ids.indexOf(racer.id) === -1);
    }

    case EDIT_RACER:
      return state.map((racer) => {
        if (racer.id === action.racer.id) {
          return action.racer;
        }
        return racer;
      });

    default:
      return state;
  }
};
const undoableRacers = racers;//undoable(racers);
export default undoableRacers;
