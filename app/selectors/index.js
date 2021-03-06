import moment from 'moment';
import { createSelector } from 'reselect';

export const getRace = (state, props) =>
  state.races.find(race => race.id === parseInt(props.match.params.raceId, 10));

export const getBikeIndex = (_, props) => props.bikeIndex;

export const getRacers = state => state.racers.present;

/**
 * @returns {Object|undefined}
 */
export const getRacer = (state, props) =>
  state.racers.present.find(
    racer => racer.id === getRace(state, props).bikeRacerMap[props.bikeIndex]
  );

export const getBike = (state, props) => state.bikes[props.bikeIndex];

export const getTicks = (state, props) => props.bikeTicks[props.bikeIndex];

export const getDistance = (race, bike, bikeTicks) => {
  let coEf = 0;
  if (bike.rollerDiameter.unit === 'centimeter') {
    if (race.measurementSystem === 'metric') {
      coEf = 100000; // 100000 cm === 1 km
    } else {
      coEf = 160934; // 160934 cm === 1 mile
    }
  } else if (race.measurementSystem === 'imperial') {
    coEf = 63360; // 63360 in === 1 mile
  } else {
    coEf = 39370.1; // 39370.1 in === 1 km
  }
  // coefficient turns roller circumferences (computed in inches or centimeters) into
  // desired output of miles or kilometers
  return bikeTicks > 0 ?
    (bikeTicks * (bike.rollerDiameter.value * Math.PI)) / coEf : 0;
};

export const getDistanceSelector = createSelector(
  [getRace, getBike, getTicks],
  getDistance
);

export const getCircumference = (race, bike) => {
  let coEf = 0;
  if (bike.rollerDiameter.unit === 'centimeter') {
    if (race.measurementSystem === 'metric') {
      coEf = 100000; // 100000 cm === 1 km
    } else {
      coEf = 160934; // 160934 cm === 1 mile
    }
  } else if (race.measurementSystem === 'imperial') {
    coEf = 63360; // 63360 in === 1 mile
  } else {
    coEf = 39370.1; // 39370.1 in === 1 km
  }
  // coefficient turns roller circumferences (computed in inches or centimeters) into
  // desired output of miles or kilometers

  return (bike.rollerDiameter.value * Math.PI) / coEf;
};

export const getTicksToComplete = (race, bike) =>
  Math.ceil(race.raceDistance /
     (race.measurementSystem === 'metric' ? 1000 : 5280) / getCircumference(race, bike));

export const raceDuration = (race, bikeIndex, now = moment()) => moment.duration(
  (race.results[bikeIndex] ? race.results[bikeIndex].finishTime : now)
    .diff(race.startTime, 'milliseconds')
);

export const getRaceDuration = createSelector(
  [getRace, getBikeIndex, () => moment()],
  raceDuration
);

// milliseconds in an hour multiplied by the milliseconds in race
// (mi or km) / hr
export const getSpeed = (distance, duration) => (
  distance > 0 ? (distance * 3600000) / duration.asMilliseconds() : 0
);

/**
 * Returns the current color selected for the bike
 * @param state
 * @param props needs props.bikeIndex
 */
export const getBikeColor = (state, props) => state.bikes[props.bikeIndex].color;

// 360 degrees * ticks / (number of ticks in a race) = current needle rotation
export const getIndicatorRotation = (distance, race) => (distance * 360) / (
  race.raceDistance / (race.measurementSystem === 'metric' ? 1000 : 5280)
);
