import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './RacerDisplay.css';
import OrdinalNumber from './OrdinalNumber';

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
    race: PropTypes.object.isRequired
  };

  render() {
    const { bikeIndex, bike, racer = {}, race } = this.props;
    const place = styles[placementClass(race.results[bikeIndex].place)];
    return (
      <div className={`${styles.container} ${place} col-xs-3`}>
        <div
          className={styles.indicator}
          style={{ backgroundColor: bike.color }}
        >
          {bikeIndex + 1}
        </div>
        <OrdinalNumber place={race.results[bikeIndex].place} />
        <div className={styles.box}>
          <label className={styles.name}>{racer.name}</label>
        </div>
      </div>
    );
  }
}
