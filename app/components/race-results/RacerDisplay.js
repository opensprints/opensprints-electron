import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './RacerDisplay.css';
import OrdinalNumber from './OrdinalNumber';
import { getDistance, raceDuration, getSpeed } from '../../selectors';

const placementClass = (place) => {
  switch (place) {
    case 1:
      return 'first';
    case 2:
      return 'second';
    case 3:
      return 'third';
    case 4:
      return 'fourth';
    case -1:
      return 'dnf';
    default:
      return 'hide';
  }
};

export default class RacerDisplay extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    bike: PropTypes.object.isRequired,
    racer: PropTypes.object.isRequired,
    race: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  render() {
    const {
      bikeIndex,
      bike,
      racer = {},
      race,
      className
    } = this.props;
    const speed = getSpeed(
      getDistance(race, bike, race.results[bikeIndex].bikeTicks),
      raceDuration(race, bikeIndex)
    );
    const place = styles[placementClass(race.results[bikeIndex].place)];
    return (
      <div className={`${styles.container} ${place} col-xs-3 ${className}`}>
        <div
          className={styles.indicator}
          style={{ backgroundColor: bike.color }}
        >
          {bikeIndex + 1}
        </div>
        <OrdinalNumber place={race.results[bikeIndex].place} />
        <div className={styles.box}>
          <label className={styles.name}>{racer.name}</label>
          <div
            style={{
              marginRight: '20px',
              fontWeight: 'bold'
            }}
            className="pull-right"
          >
            {race.measurementSystem === 'metric' ?
              `${speed.toFixed(1)} KPH` : `${speed.toFixed(1)} MPH`}
          </div>
        </div>
      </div>
    );
  }
}
