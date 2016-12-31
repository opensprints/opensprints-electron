import moment from 'moment';

export const ADD_RACER = 'ADD_RACER';
export const REMOVE_RACERS = 'REMOVE_RACERS';
export const EDIT_RACER = 'EDIT_RACER';

let id = 0;

export function addRacer(racer) {
  return {
    type: ADD_RACER,
    racer: {
      ...racer,
      id: id++,
      createdDate: moment()
    }
  };
}

export function removeRacers(ids) {
  return {
    type: REMOVE_RACERS,
    ids
  };
}

export function editRacer() {
  return {
    type: EDIT_RACER
  };
}
