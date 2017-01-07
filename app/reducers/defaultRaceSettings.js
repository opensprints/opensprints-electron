import moment from 'moment';
import { CHANGE_DEFAULT_RACE_SETTING } from '../actions/defaultRaceSetting';

const initialState = {
  measurementSystem: 'metric',
  raceDistance: '100',
  raceDistanceUnits: 'meters',
  trialDuration: moment.duration('00:00:30'),
  timerDirection: 'down'
};

export default function defaultRaceSettings(state = initialState, action) {
  switch (action.type) {
    case CHANGE_DEFAULT_RACE_SETTING:
      return Object.assign({}, state, { [action.key]: action.value });

    default:
      return state;
  }
}
