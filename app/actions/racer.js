export const ADD_RACER = 'ADD_RACER';
export const REMOVE_RACERS = 'REMOVE_RACERS';
export const EDIT_RACER = 'EDIT_RACER';

export function addRacer(racer) {
  return {
    type: ADD_RACER,
    racer
  };
}

export function removeRacers(ids) {
  return {
    type: REMOVE_RACERS,
    ids
  };
}

export function editRacer(racer) {
  return {
    type: EDIT_RACER,
    racer
  };
}
