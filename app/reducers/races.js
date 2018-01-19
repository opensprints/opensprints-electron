import moment from 'moment';
import filter from 'lodash/filter';
import { LOAD } from 'redux-storage';
import {
  ADD_AD_HOC_RACE,
  ADD_RACES,
  REMOVE_RACE,
  CHANGE_RACE_ORDER,
  START_RACE,
  RESTART_RACE,
  END_ONGOING_RACE,
  UPDATE_RACE,
  FINISH_RACER,
  FINISH_ONGOING_RACE
} from '../actions/race';

window.newRaceId = null;

export default function races(state = [], action) {
  switch (action.type) {
    case LOAD: {
      // update all races to not be current
      const savedRaces = action.payload.races;
      if (window.newRaceId === null) {
        window.newRaceId = savedRaces.length > 0 ? (savedRaces.map(race => race.id).reduce(
          (idA, idB) => (idA > idB ? idA : idB)
        ) + 1) : 0;
      }
      return state.map(race => ({ ...race, current: false }));
    }
    case ADD_AD_HOC_RACE: {
      const race = {
        id: (window.newRaceId += 1),
        bikeRacerMap: {},
        bikeTicks: [],
        createdDate: moment()
      };
      action.bikes.forEach((_, i) => {
        race.bikeRacerMap[i] = -1;
      });

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
        const bikeTicks = [];
        action.racerIds.slice(i * numOfBikes,
          Math.min((i + 1) * numOfBikes, action.racerIds.length)
        )
          .forEach((racerId, index) => {
            bikeRacerMap[index] = racerId;
            bikeTicks[index] = 0;
          });
        newRaces.push({
          id: window.newRaceId += 1,
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
          return Object.assign({}, race, { startTime: moment(), current: true });
        }
        return race;
      });

    case RESTART_RACE:
      return state.map((race) => {
        if (race.id === action.id) {
          const newRace = Object.assign({}, race);
          delete newRace.startTime;
          delete newRace.finishTime;
          newRace.bikeTicks = new Array(newRace.results.length).fill(0);
          newRace.results = new Array(newRace.results.length).fill(0);
          return newRace;
        }
        return race;
      });

    case FINISH_RACER:
      return state.map((race) => {
        if (race.current) {
          if (race.results[action.bikeIndex] !== null) {
            return race;
          }
          const nextRace = { ...race };
          nextRace.results[action.bikeIndex] = getPlace(nextRace);

          return nextRace;
        }
        return race;
      });
    case FINISH_ONGOING_RACE:
      return state.map((race) => {
        if (race.current) {
          return { ...race,
            current: false,
            finished: true,
            finishedDate: moment(),
          };
        }
        return race;
      });
    case END_ONGOING_RACE:
      return state.map((race) => {
        if (race.id === action.race.id) {
          const results = Object.keys(action.race.bikeRacerMap).map(() => null);
          Object.keys(action.race.bikeRacerMap).forEach((bikeIndex) => {
            if (!action.race.results[bikeIndex]) {
              results[bikeIndex] = { place: -1 };
            }
          });
          return {
            ...action.race,
            finishedDate: moment(),
            current: false,
            results: Object.assign({}, action.race.results, results)
          };
        }
        return race;
      });

    default:
      return state;
  }
}

function getPlace(state) {
  const place = { finishTime: moment() };
  // what place are they?
  place.place = filter(state.results, 'place').length + 1;
  return place;
}
