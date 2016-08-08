import { ADD_RACE } from '../actions/races';

export default function races(state = [], action) {
  switch (action.type) {
    case ADD_RACE:
      return [
        ...state,
        action.race
      ];
    default:
      return state;
  }
}
