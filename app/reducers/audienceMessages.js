import {
  ADD_MESSAGE,
  EDIT_MESSAGE,
  REMOVE_MESSAGE
} from '../actions/audienceMessage';

export default function audienceMessages(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return [
        action.message,
        ...state
      ];

    case EDIT_MESSAGE:
      return state.map((message) => {
        if (message.id === action.message.id) {
          return action.message;
        }
        return message;
      });

    case REMOVE_MESSAGE:
      return state.filter(message => action.id !== message.id);

    default:
      return state;
  }
}
