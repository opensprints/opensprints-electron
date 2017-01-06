export const CHANGE_DEFAULT_RACE_SETTING = 'CHANGE_DEFAULT_RACE_SETTING';

export function changeDefaultRaceSetting(key, value) {
  return {
    type: CHANGE_DEFAULT_RACE_SETTING,
    key,
    value
  };
}
