import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRace, getBike, getRacer, getDistance, getRaceDuration, getSpeed } from '../../selectors';
import racerStyles from '../race-preview/RacerSelect.css';

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
    bike: getBike(state, props),
    racer: getRacer(state, props),
    measurementSystem: getRace(state, props).measurementSystem,
    distance: getDistance(state, props),
    speed: getSpeed(getDistance(state, props), getRaceDuration(state, props))
  };
}

export default connect(mapStateToProps)(RacerStats);
