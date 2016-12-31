import moment from 'moment';
import { ADD_RACES, REMOVE_RACE, CHANGE_RACE_ORDER } from '../actions/race';

export default function races(state = [], action) {
  switch (action.type) {
    case ADD_RACES:
      return [
        ...state,
        ...action.races
      ];

    case REMOVE_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          return Object.assign({}, race, { deleted: true, deletedDate: moment() });
        }
        return race;
      });

    case CHANGE_RACE_ORDER: {
      const raceOne = state.filter((race) => race.id === action.id)[0];
      const raceTwo = state.filter((race) => race.id === action.secondId)[0];
      return state.map((race) => {
        if (race.id === action.id) {
          return raceTwo;
        }
        if (race.id === action.secondId) {
          return raceOne;
        }
        return race;
      });
    }

    default:
      return state;
  }
}
