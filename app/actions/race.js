import moment from 'moment';

export const ADD_AD_HOC_RACE = 'ADD_AD_HOC_RACE';
export const ADD_RACES = 'ADD_RACES';
export const REMOVE_RACE = 'REMOVE_RACE';
export const CHANGE_RACE_ORDER = 'CHANGE_RACE_ORDER';
export const START_RACE = 'START_RACE';
export const RESTART_RACE = 'RESTART_RACE';
export const END_ONGOING_RACE = 'END_ONGOING_RACE';
export const UPDATE_RACE = 'UPDATE_RACE';
export const FINISH_RACER = 'FINISH_RACER';
export const FINISH_ONGOING_RACE = 'FINISH_ONGOING_RACE';

export function updateRace(newRace) {
  return {
    type: UPDATE_RACE,
    race: newRace
  };
}

export function addEmptyRace(bikes) {
  return {
    type: ADD_AD_HOC_RACE,
    bikes
  };
}

export function addRaces(bikes, racerIds) {
  return {
    type: ADD_RACES,
    bikes,
    racerIds
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

export function restartRace(id) {
  return {
    type: RESTART_RACE,
    id
  };
}

export function endOngoingRace(race, bikeTicks) {
  return {
    type: END_ONGOING_RACE,
    race,
    bikeTicks
  };
}

export function finishRace(race, bikeTicks) {
  return {
    type: FINISH_ONGOING_RACE,
    race,
    bikeTicks
  };
}

export function finishRacer(bikeIndex, bikeTicks) {
  return {
    type: FINISH_RACER,
    bikeIndex,
    bikeTicks,
    timestamp: moment()
  };
}
