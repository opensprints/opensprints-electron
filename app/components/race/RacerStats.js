import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import moment from 'moment';
import { connect } from 'react-redux';
import racerStyles from '../race-preview/RacerSelect.css';

const getRace = (state, props) =>
  state.races.find((race) => race.id === parseInt(props.raceId, 10));

const getBikeIndex = (_, props) => props.bikeIndex;

const getRacer = (state, props) =>
    state.racers.present.find(
      (racer) => racer.id === getRace(state, props).bikeRacerMap[props.bikeIndex]
    );

const getBike = (state, props) => state.bikes[props.bikeIndex];

const getDistance = createSelector(
  [getRace, getBikeIndex, getBike],
  (race, bikeIndex, bike) => {
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
    return race.bikeTicks[bikeIndex] > 0 ?
      (race.bikeTicks[bikeIndex] * (bike.rollerDiameter.value * Math.PI)) / coEf : 0;
  }
);

const getRaceDuration = createSelector(
  [getRace],
  (race) => moment.duration(moment().diff(race.startTime, 'milliseconds'))
);

// milliseconds in an hour multiplied by the milliseconds in race
// (mi or km) / hr
const getSpeed = (distance, duration) => (
  distance > 0 ? (distance * 3600000) / duration.asMilliseconds() : 0
);

class RacerStats extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    raceId: PropTypes.number.isRequired,

    bike: PropTypes.object,
    racer: PropTypes.object,
    measurementSystem: PropTypes.string,
    distance: PropTypes.number,
    speed: PropTypes.number
  }

  render() {
    const { bikeIndex, bike, racer, measurementSystem, distance, speed } = this.props;

    return (
      <div className={`col-xs-3 ${racerStyles['racer-select']}`}>
        <div
          className={racerStyles['bike-indicator']}
          style={{ backgroundColor: bike.color }}
        >
          {bikeIndex + 1}
        </div>
        <div
          style={{ marginBottom: '5px' }}
          className={racerStyles['racer-edit-container']}
        >
          <span className={racerStyles.name}>
            {racer.name}
          </span>
          <div>
            {measurementSystem === 'metric' ?
              `${(distance * 1000).toFixed(1)} m` : `${(distance * 5280).toFixed(1)} ft`}
            <div
              style={{
                marginRight: '20px',
                fontWeight: 'bold'
              }}
              className="pull-right"
            >
              {measurementSystem === 'metric' ?
                `${speed.toFixed(1)} KPH` : `${speed.toFixed(1)} MPH`}
            </div>
          </div>
        </div>
        <div
          style={{ paddingLeft: '8px' }}
        >
          <span
            style={{
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            FIN
          </span>
          00:00:00.0 (Not Implemented)
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    ...props,
    bikeIndex: getBikeIndex(state, props),
    bike: getBike(state, props),
    racer: getRacer(state, props),
    measurementSystem: getRace(state, props).measurementSystem,
    distance: getDistance(state, props),
    speed: getSpeed(getDistance(state, props), getRaceDuration(state, props))
  };
}

export default connect(mapStateToProps)(RacerStats);
