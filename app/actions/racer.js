export const ADD_RACER = 'ADD_RACER';
export const EDIT_RACER = 'EDIT_RACER';

let id = 0;

export function addRacer(racer) {
  return {
    type: ADD_RACER,
    racer: {
      ...racer,
      id: id++
    }
  };
}

export function editRacer() {
  return {
    type: EDIT_RACER
  };
}
