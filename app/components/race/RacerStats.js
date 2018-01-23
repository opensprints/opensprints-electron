import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { getRace, getBike, getRacer, getRaceDuration, getSpeed, getDistanceSelector } from '../../selectors';
import racerStyles from '../race-preview/RacerSelect.css';

const renderFinishTime = (clock) => {
  let minutes = Math.floor(clock.asMinutes()).toFixed(0);
  let seconds = (clock.asSeconds() % 60).toFixed(2);
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  if (seconds.length < 4) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

class RacerStats extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,

    bikeTicks: PropTypes.array.isRequired,
    bike: PropTypes.object.isRequired,
    measurementSystem: PropTypes.string.isRequired,
    distance: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
    race: PropTypes.objectOf({
      results: PropTypes.arrayOf({
        finishTime: PropTypes.object // import moment-propTypes for proper type checking
      })
    }).isRequired,
    racer: PropTypes.object
  };

  static defaultProps = {
    racer: undefined
  };

  render() {
    const { bikeIndex, bike, racer, measurementSystem, distance, speed, race } = this.props;

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
            {racer ? racer.name : ''}
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
          {
            race.results[bikeIndex] !== null ?
              renderFinishTime(moment.duration(
                race.results[bikeIndex].finishTime.valueOf() - race.startTime.valueOf()
              )) : '_ _ : _ _ . _ _'
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const race = getRace(state, props);
  return {
    ...props,
    race,
    bike: getBike(state, props),
    racer: getRacer(state, props),
    measurementSystem: getRace(state, props).measurementSystem,
    distance: getDistanceSelector(state, props),
    speed: getSpeed(
      getDistanceSelector(state, props),
      getRaceDuration(state, props)
    )
  };
}

export default connect(mapStateToProps)(RacerStats);
