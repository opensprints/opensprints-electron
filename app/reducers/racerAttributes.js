import { TOGGLE_ATTRIBUTE } from '../actions/racerAttributes';

const attributes = {
  sex: ['Male', 'Female'],
  level: ['Novice', 'Intermediate', 'Expert']
};

export default function racerAttributes(state = {}, action) {
  switch (action.type) {
    case TOGGLE_ATTRIBUTE: {
      if (!state[action.attribute]) {
        return Object.assign({}, state, { [action.attribute]: attributes[action.attribute] });
      }
      const newState = { ...state };
      delete newState[action.attribute];
      return newState;
    }
    default:
      return state;
  }
}
