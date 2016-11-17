export const ADD_RACE = 'ADD_RACE';
export const REMOVE_RACE = 'REMOVE_RACE';
export const CHANGE_RACE_ORDER = 'CHANGE_RACE_ORDER';

let staticId = 0;

export function addRace(bikes, bikeRacerMap) {
  return {
    type: ADD_RACE,
    race: {
      id: staticId++,
      bikeRacerMap
    }
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
