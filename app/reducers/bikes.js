import { UPDATE_BIKES_AVAILABLE, UPDATE_BIKE_CONFIGURATION } from '../actions/bike';
import {LOAD} from 'redux-storage';
const initialState = [
  {
    rollerDiameter: {
      value: 3.9,
      unit: 'inch'
    },
    color: '#881212'
  },
  {
    rollerDiameter: {
      value: 3.9,
      unit: 'inch'
    },
    color: '#2521C2'
  },
  {
    rollerDiameter: {
      value: 3.9,
      unit: 'inch'
    },
    color: '#7C2B9A'
  },
  {
    rollerDiameter: {
      value: 3.9,
      unit: 'inch'
    },
    color: '#1F7C46'
  }
];

export default function bikes(state = initialState, action) {
  console.log(state,action);
  switch (action.type) {
    // case LOAD:
    //   return action.payload.bikes;
    case UPDATE_BIKES_AVAILABLE:
      if (action.n > state.length) {
        return [
          ...state,
          ...initialState.slice(state.length, action.n)
        ];
      }
      return state.slice(0, action.n);

    case UPDATE_BIKE_CONFIGURATION:
      return state.map((bike, index) => {
        if (index === action.index) {
          return action.bike;
        }
        return bike;
      });
    default:
      return state;
  }
}
