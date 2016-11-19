import { ADD_RACE, REMOVE_RACE, CHANGE_RACE_ORDER } from '../actions/race';

export default function races(state = [], action) {
  switch (action.type) {
    case ADD_RACE:
      return [
        ...state,
        action.race
      ];

    case REMOVE_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          return Object.assign({}, race, { deleted: true });
        }
        return race;
      });

    case CHANGE_RACE_ORDER: {
      const uno = state.filter((race) => race.id === action.id)[0];
      const dos = state.filter((race) => race.id === action.secondId)[0];
      return state.map((race) => {
        if (race.id === action.id) {
          return dos;
        }
        if (race.id === action.secondId) {
          return uno;
        }
        return race;
      });
    }

    default:
      return state;
  }
}
