export const ADD_RACE = 'ADD_RACE';

let id = 0;

export function addRace(racers) {
  return {
    type: ADD_RACE,
    race: {
      id: id++,
      racers
    }
  };
}
