export const UPDATE_MESSAGE_TEXT = 'UPDATE_MESSAGE_TEXT';
export const PRE_COUNTDOWN_MESSAGE = 'PRE_COUNTDOWN_MESSAGE';
export const COUNTDOWN_MESSAGE_3 = 'COUNTDOWN_MESSAGE_3';
export const COUNTDOWN_MESSAGE_2 = 'COUNTDOWN_MESSAGE_2';
export const COUNTDOWN_MESSAGE_1 = 'COUNTDOWN_MESSAGE_1';
export const COUNTDOWN_MESSAGE_GO = 'COUNTDOWN_MESSAGE_GO';
export const WINNER_MESSAGE = 'WINNER_MESSAGE';
export const FALSE_START_MESSAGE = 'FALSE_START_MESSAGE';

export function updateMessageText(key, message) {
  return {
    type: UPDATE_MESSAGE_TEXT,
    key,
    message
  };
}
