import moment from 'moment';
import {
  ADD_AD_HOC_RACE,
  ADD_RACES,
  REMOVE_RACE,
  CHANGE_RACE_ORDER,
  START_RACE,
  RESTART_RACE,
  END_ONGOING_RACE,
  UPDATE_RACE,
  INCREMENT_RACER
} from '../actions/race';

let staticId = 0;

export default function races(state = [], action) {
  switch (action.type) {
    case ADD_AD_HOC_RACE: {
      const race = {
        id: (staticId += 1),
        bikeRacerMap: {},
        bikeTicks: {},
        createdDate: moment()
      };

      return [
        race,
        ...state
      ];
    }
    case ADD_RACES: {
      const newRaces = [];
      const numOfBikes = action.bikes.length;
      for (let i = 0; i < Math.ceil(action.racerIds.length / action.bikes.length); i += 1) {
        const bikeRacerMap = {};
        const bikeTicks = {};
        action.racerIds.slice(i * numOfBikes, Math.min((i + 1) * numOfBikes, action.racerIds.length))
          .forEach((racerId, index) => {
            bikeRacerMap[index] = racerId;
            bikeTicks[index] = 0;
          });
        newRaces.push({
          id: staticId += 1,
          bikeRacerMap,
          bikeTicks,
          createdDate: moment()
        });
      }
      return [
        ...state,
        ...newRaces
      ];
    }

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

    case END_ONGOING_RACE:
      return state.map((race) => {
        if (race.id === action.race.id) {
          const results = {};
          if (!action.race.results) {
            Object.keys(action.race.bikeRacerMap).forEach((bikeIndex) => {
              results[bikeIndex] = { place: -1 };
            });
          } else {
            Object.keys(action.race.bikeRacerMap).forEach((bikeIndex) => {
              if (!action.race.results[bikeIndex]) {
                results[bikeIndex] = { place: -1 };
              }
            });
          }
          return {
            ...action.race,
            finishedDate: moment(),
            results: Object.assign({}, action.race.results, results)
          };
        }
        return action.race;
      });

    default:
      return state;
  }
}
