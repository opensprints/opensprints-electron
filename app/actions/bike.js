export const UPDATE_BIKES_AVAILABLE = 'UPDATE_BIKES_AVAILABLE';
export const UPDATE_BIKE_CONFIGURATION = 'UPDATE_BIKE_CONFIGURATION';

export function updateBikesAvailable(n) {
  return {
    type: UPDATE_BIKES_AVAILABLE,
    n
  };
}

export function updateBikeConfiguration(index, bike) {
  return {
    type: UPDATE_BIKE_CONFIGURATION,
    index,
    bike
  };
}
