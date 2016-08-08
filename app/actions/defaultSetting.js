export const UPDATE_DEFAULT_SETTINGS = 'UPDATE_DEFAULT_SETTINGS';

export function updateSetting(updatedSetting) {
  return {
    type: UPDATE_DEFAULT_SETTINGS,
    ...updatedSetting
  };
}
