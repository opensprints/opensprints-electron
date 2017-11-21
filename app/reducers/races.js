import moment from 'moment';
import {
  ADD_AD_HOC_RACE,
  ADD_RACES,
  REMOVE_RACE,
  CHANGE_RACE_ORDER,
  START_RACE,
  RESTART_RACE,
  UPDATE_RACE,
  INCREMENT_RACER
} from '../actions/race';

export default function races(state = [], action) {
  switch (action.type) {
    case ADD_AD_HOC_RACE:
      return [
        action.race,
        ...state
      ];

    case ADD_RACES:
      return [
        ...state,
        ...action.races
      ];

    case UPDATE_RACE:
      return state.map((race) => {
        if (race.id === action.race.id) {
          return action.race;
        }
        return race;
      });

    case REMOVE_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          return Object.assign({}, race, { deleted: true, deletedDate: moment() });
        }
        return race;
      });

    case CHANGE_RACE_ORDER: {
      const raceOne = state.filter(race => race.id === action.id)[0];
      const raceTwo = state.filter(race => race.id === action.secondId)[0];
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

    case START_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          return Object.assign({}, race, { startTime: moment() });
        }
        return race;
      });

    case RESTART_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          const newRace = Object.assign({}, race);
          newRace.startTime = undefined;
          return newRace;
        }
        return race;
      });

    case INCREMENT_RACER:
      return state.map((race) => {
        if (race.id === action.raceId) {
          return Object.assign({}, race, {
            bikeTicks: Object.assign({}, race.bikeTicks, {
              [action.bikeIndex]: race.bikeTicks[action.bikeIndex] + 1
            })
          });
        }
        return race;
      });

    default:
      return state;
  }
}
