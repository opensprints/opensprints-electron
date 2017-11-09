import moment from 'moment';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';
export const EDIT_MESSAGE = 'EDIT_MESSAGE';

let idInc = 0;

export function addMessage(message = { title: '', subtext: '' }) {
  return {
    type: ADD_MESSAGE,
    message: {
      ...message,
      id: idInc++,
      createdDate: moment()
    }
  };
}

export function removeMessage(id) {
  return {
    type: REMOVE_MESSAGE,
    id
  };
}

export function editMessage(message) {
  return {
    type: EDIT_MESSAGE,
    message
  };
}
