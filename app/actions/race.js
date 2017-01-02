import moment from 'moment';

export const ADD_RACES = 'ADD_RACES';
export const REMOVE_RACE = 'REMOVE_RACE';
export const CHANGE_RACE_ORDER = 'CHANGE_RACE_ORDER';
export const START_RACE = 'START_RACE';

let staticId = 0;

export function addRaces(bikes, racerIds) {
  const races = [];
  for (let i = 0; i < Math.ceil(racerIds.length / bikes.length); i++) {
    const bikeRacerMap = {};
    racerIds.slice(i * 4, Math.min((i + 1) * 4, racerIds.length))
      .forEach((racerId, index) => {
        bikeRacerMap[index] = racerId;
      });
    races.push({
      id: staticId++,
      bikeRacerMap,
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
