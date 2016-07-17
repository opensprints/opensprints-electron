export const TOGGLE_NAVIGATION_MENU = 'TOGGLE_NAVIGATION_MENU';
export const CLOSE_NAVIGATION_MENU = 'CLOSE_NAVIGATION_MENU';

export function toggle() {
  return {
    type: TOGGLE_NAVIGATION_MENU
  };
}

export function close() {
  return {
    type: CLOSE_NAVIGATION_MENU
  };
}
