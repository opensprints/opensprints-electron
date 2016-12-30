import React, { Component, PropTypes } from 'react';
import styles from './OrdinalNumber.css';

export default class OrdinalNumber extends Component {
  static propTypes = {
    place: PropTypes.number.isRequired
  }

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
      default:
        return '';
    }
  }

  static suffix(place) {
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

  constructor(props, context) {
    super(props, context);
    this.state = {
      suffix: OrdinalNumber.suffix(props.place)
    };
  }

  render() {
    const { place } = this.props;
    const { suffix } = this.state;
    const name = OrdinalNumber.placementClass(place);
    return (
      <div
        className={`${styles.container} ${styles[name]}`}
      >
        {place}
        <span className={`${styles.suffix} ${styles[`suffix-${name}`]}`}>
          {suffix}
        </span>
      </div>
    );
  }
}
