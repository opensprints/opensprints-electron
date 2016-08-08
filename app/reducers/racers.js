import { ADD_RACER } from '../actions/racer';

export default function racers(state = [], action) {
  switch (action.type) {
    case ADD_RACER:
      return [
        ...state,
        action.racer
      ];
    default:
      return state;
  }
}
