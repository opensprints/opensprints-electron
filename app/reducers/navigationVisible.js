import { TOGGLE_NAVIGATION_MENU, CLOSE_NAVIGATION_MENU } from '../actions/navigationVisible';

export default function navigation(state = false, action) {
  switch (action.type) {
    case TOGGLE_NAVIGATION_MENU:
      return !state;
    case CLOSE_NAVIGATION_MENU:
      return false;
    default:
      return state;
  }
}
