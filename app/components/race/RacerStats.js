import React, { Component, PropTypes } from 'react';
import { createSelector } from 'reselect';
import racerStyles from '../race-preview/RacerSelect.css';

const getRace = (state, props) =>
  state.races.find((race) => race.id === parseInt(props.params.race, 10));

const getBikeIndex = (_, props) => props.bikeIndex;

const getRacer = createSelector(
  [getRace, getBikeIndex],
  (race, bikeIndex) => state.racers.find((racer) => racer.id === race.bikeRacerMap[bikeIndex])
);

const getBike = (state, props) => state.bikes[props.bikeIndex];

// TODO: Do I handle Imperial/Metric conversions here or later...
const getDistance = createSelector(
  [getRace, getBikeIndex, getBike],
  (race, bikeIndex, bike) => race.bikeTicks[bikeIndex] * (bike.rollerDiameter.value * Math.PI)
);

// TODO
const getSpeed = createSelector(
  [getRace, getDistance],
  (race, distance) => race.startTime
);

export default class RacerStats extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    bike: PropTypes.object.isRequired,
    racer: PropTypes.object.isRequired,
    race: PropTypes.object
  }

  render() {
    const { bikeIndex, bike, racer } = this.props;
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
            00.0 m
            <div
              style={{
                marginRight: '20px',
                fontWeight: 'bold'
              }}
              className="pull-right"
            >
              00.0 km/hr
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
          00:00:00.0
        </div>
      </div>
    );
  }
}
