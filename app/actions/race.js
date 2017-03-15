import moment from 'moment';

export const ADD_AD_HOC_RACE = 'ADD_AD_HOC_RACE';
export const ADD_RACES = 'ADD_RACES';
export const REMOVE_RACE = 'REMOVE_RACE';
export const CHANGE_RACE_ORDER = 'CHANGE_RACE_ORDER';
export const START_RACE = 'START_RACE';
export const UPDATE_RACE = 'UPDATE_RACE';
export const INCREMENT_RACER = 'INCREMENT_RACER';

let staticId = 0;

export function updateRace(newRace) {
  return {
    type: UPDATE_RACE,
    race: newRace
  };
}

export function addEmptyRace() {
  return {
    type: ADD_AD_HOC_RACE,
    race: {
      id: (staticId += 1),
      bikeRacerMap: {},
      bikeTicks: {},
      createdDate: moment()
    }
  };
}

export function addRaces(bikes, racerIds) {
  const races = [];
  for (let i = 0; i < Math.ceil(racerIds.length / bikes.length); i += 1) {
    const bikeRacerMap = {};
    const bikeTicks = {};
    racerIds.slice(i * 4, Math.min((i + 1) * 4, racerIds.length))
      .forEach((racerId, index) => {
        bikeRacerMap[index] = racerId;
        bikeTicks[index] = 0;
      });
    races.push({
      id: staticId += 1,
      bikeRacerMap,
      bikeTicks,
      createdDate: moment()
    });
  }
  return {
    type: ADD_RACES,
    races
  };
}

export function removeRace(id) {
  return {
    type: REMOVE_RACE,
    id
  };
}

export function changeRaceOrder(id, secondId) {
  return {
    type: CHANGE_RACE_ORDER,
    id,
    secondId
  };
}

export function startRace(id) {
  return {
    type: START_RACE,
    id
  };
}

export function incrementRacer(raceId, bikeIndex) {
  return {
    type: INCREMENT_RACER,
    raceId,
    bikeIndex,
    timestamp: moment()
  };
}
