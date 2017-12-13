import moment from 'moment';
import undoable from 'redux-undo';
import { ADD_RACER, REMOVE_RACERS, EDIT_RACER } from '../actions/racer';

window.newRacerId = null;

const racers = (state = [], action) => {
  switch (action.type) {
    case 'REDUX_STORAGE_LOAD': {
      const savedRacers = action.payload.racers.present;
      if (window.newRacerId === null) {
        window.newRacerId = savedRacers.length > 0 ? (savedRacers.map(racer => racer.id).reduce(
          (idA, idB) => (idA > idB ? idA : idB)
        ) + 1) : 0;
      }
      return savedRacers;
    }

    case ADD_RACER: {
      return [
        ...state,
        {
          ...action.racer,
          id: window.newRacerId++,
          createdDate: moment()
        }
      ];
    }

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
const undoableRacers = undoable(racers);
export default undoableRacers;
