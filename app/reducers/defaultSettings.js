import { UPDATE_DEFAULT_SETTINGS } from '../actions/defaultSettings';

export default function navigation(state = {}, action) {
  switch (action.type) {
    case UPDATE_DEFAULT_SETTINGS:
      // TODO
    default:
      return state;
  }
}
