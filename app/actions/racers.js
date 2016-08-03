export const ADD_RACER = 'ADD_RACER';
export const EDIT_RACER = 'EDIT_RACER';

export function addRacer(racer) {
  return {
    type: ADD_RACER,
    racer
  };
}

export function editRacer() {
  return {
    type: EDIT_RACER
  };
}
