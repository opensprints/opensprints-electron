import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './OrdinalNumber.css';

export default class OrdinalNumber extends Component {
  static propTypes = {
    place: PropTypes.number.isRequired
  };

  static placementClass(place) {
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
        return '';
    }
  }

  static suffix(place) {
    if (place === -1) {
      return '';
    }
    const ones = place % 10;
    const tens = place % 100;
    if (ones === 1 && tens !== 11) {
      return 'st';
    }
    if (ones === 2 && tens !== 12) {
      return 'nd';
    }
    if (ones === 3 && tens !== 13) {
      return 'rd';
    }
    return 'th';
  }

  render() {
    const { place } = this.props;
    const suffix = OrdinalNumber.suffix(place);
    const placeClass = OrdinalNumber.placementClass(place);
    return (
      <div
        className={`${styles.container} ${styles[placeClass]}`}
      >
        {place === -1 ? 'DNF' : place}
        <span className={`${styles.suffix} ${styles[`suffix-${placeClass}`]}`}>
          {suffix}
        </span>
      </div>
    );
  }
}
