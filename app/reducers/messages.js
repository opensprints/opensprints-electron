import {
  UPDATE_MESSAGE_TEXT,
  PRE_COUNTDOWN_MESSAGE,
  COUNTDOWN_MESSAGE_3,
  COUNTDOWN_MESSAGE_2,
  COUNTDOWN_MESSAGE_1,
  COUNTDOWN_MESSAGE_GO,
  WINNER_MESSAGE,
  FALSE_START_MESSAGE
} from '../actions/message';

const initialState = {
  [PRE_COUNTDOWN_MESSAGE]: 'Racers, on your marks!',
  [COUNTDOWN_MESSAGE_3]: 'Three...',
  [COUNTDOWN_MESSAGE_2]: 'Two...',
  [COUNTDOWN_MESSAGE_1]: 'One...',
  [COUNTDOWN_MESSAGE_GO]: 'Go!!!',
  [WINNER_MESSAGE]: 'Winner!',
  [FALSE_START_MESSAGE]: 'Whoa there!'
};

export default function messages(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MESSAGE_TEXT:
      return Object.assign({}, state, { [action.key]: action.message });
    default:
      return state;
  }
}
