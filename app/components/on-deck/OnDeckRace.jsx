import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './OnDeck.css';

const BlueMessage = ({ style, children }) => (
  <div
    style={style}
    className={styles['blue-message']}
  >
    {children}
  </div>
);
BlueMessage.propTypes = {
  style: PropTypes.object,
  children: PropTypes.node.isRequired
};

BlueMessage.defaultProps = {
  style: undefined
};

class OnDeckRace extends Component {
  static propTypes = {
    queuePosition: PropTypes.number.isRequired,
    race: PropTypes.object.isRequired,
    racers: PropTypes.array.isRequired,
    style: PropTypes.object,
    childStyle: PropTypes.object,
    className: PropTypes.string
  };

  static defaultProps = {
    style: undefined,
    childStyle: undefined,
    className: ''
  };

  render() {
    const { queuePosition, race, racers, style, className, childStyle } = this.props;
    return (
      <div style={style} className={className}>
        {Object.keys(race.bikeRacerMap).map((key) => {
          const modifier = Object.keys(race.bikeRacerMap).length * (queuePosition - 1);
          const r = racers.find(racer => racer.id === race.bikeRacerMap[key]);
          return (
            <BlueMessage key={`OnDeckRace-Racer-${race.bikeRacerMap[key]}`} style={childStyle}>
              {parseInt(key, 10) + 1 + modifier}. {r && r.name}
            </BlueMessage>
          );
        })}
      </div>
    );
  }
}

export default OnDeckRace;
