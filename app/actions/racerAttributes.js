export const TOGGLE_ATTRIBUTE = 'TOGGLE_ATTRIBUTE';

export function toggleAttribute(attribute) {
  return {
    type: TOGGLE_ATTRIBUTE,
    attribute
  };
}
