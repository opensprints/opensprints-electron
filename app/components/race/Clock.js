import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import moment from 'moment';
import styles from './Clock.css';
import Indicator from './Indicator';

const renderTimer = (clock) => {
  let minutes = Math.floor(clock.asMinutes()).toFixed(0);
  let seconds = (clock.asSeconds() % 60).toFixed(1);
  if (minutes.length < 2) {
    minutes = `0${minutes}`;
  }
  if (seconds.length < 4) {
    seconds = `0${seconds}`;
  }
  return `${minutes}:${seconds}`;
};

// Todo: find a better way to not duplicate this code
const getDistance = (race, bikeIndex, bike) => {
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
};

const getRotation = (distance, race) => {
  const rotation = (distance * 360) / (
    race.raceDistance / (race.measurementSystem === 'metric' ? 1000 : 5280)
  );
  return rotation < 360 ? rotation : 0;
};

export default class Clock extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    bikes: PropTypes.array.isRequired,
    startTime: PropTypes.object
  };

  static defaultProps = {
    startTime: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      clock: 0
    };
  }

  componentDidMount() {
    this.state = {
      clock: this.props.startTime ?
        moment.duration(moment().valueOf() - this.props.startTime.valueOf()) : 0,
      intervalId: setInterval((() => this.setState({
        clock: this.props.startTime ?
          moment.duration(moment().valueOf() - this.props.startTime.valueOf()) : 0
      })), 100)
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const clock = this.state.clock || 0;
    const { race, bikes } = this.props;
    return (
      <div className={styles['clock-frame']}>
        <div className={styles['clock-face']}>
          <div className={`${styles.poleContainer} ${styles.northContainer}`}>
            <span>{race.raceDistance}</span>
          </div>
          <div className={`${styles.poleGuideline} ${styles.northGuideline}`} />

          <div className={`${styles.tropicContainer} ${styles.eastContainer}`}>
            <span>{race.raceDistance / 4}</span>
          </div>
          <div className={`${styles.tropicGuideline} ${styles.eastGuideline}`} />

          <div className={`${styles.poleContainer} ${styles.southContainer}`}>
            <span>{race.raceDistance / 2}</span>
          </div>
          <div className={`${styles.poleGuideline} ${styles.southGuideline}`} />

          <div className={`${styles.tropicContainer} ${styles.westContainer}`}>
            <span>{race.raceDistance * 0.75}</span>
          </div>
          <div className={`${styles.tropicGuideline} ${styles.westGuideline}`} />

          <div className={styles['clock-center']} />
          <Stage
            width={380}
            height={380}
            listening={false}
          >
            <Layer listening={false}>
              {Object.keys(race.bikeRacerMap)
                .filter(bikeIndex => (typeof race.bikeRacerMap[bikeIndex] !== 'undefined'))
                .map(bikeIndex => (
                  <Indicator
                    key={`Indicator-${bikeIndex}`}
                    color={bikes[parseInt(bikeIndex, 10)].color}
                    rotation={
                      getRotation(
                        getDistance(race, parseInt(bikeIndex, 10), bikes[parseInt(bikeIndex, 10)]),
                        race
                      )
                    }
                  />
                ))
              }
            </Layer>
          </Stage>
        </div>
        <div className={styles.stopwatch}>
          {clock.asSeconds ? renderTimer(clock) : clock}
        </div>
      </div>
    );
  }
}
