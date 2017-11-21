import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import moment from 'moment';
import styles from './Clock.css';
import Indicator from './Indicator';

let intervalId;

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

export default class Clock extends Component {
  static propTypes = {
    race: PropTypes.object,
    bikes: PropTypes.array,
    startTime: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      clock: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.startTime && !intervalId) {
      const { startTime } = nextProps;
      if (startTime) {
        this.setState({
          clock: moment.duration(moment().valueOf() - startTime.valueOf())
        });
      }
      const fn = () => {
        if (startTime) {
          this.setState({
            clock: moment.duration(moment().valueOf() - startTime.valueOf())
          });
        }
      };
      intervalId = setInterval(fn, 100);
    } else if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
      this.setState({ clock: 0 });
    }
  }

  componentWillUnmount() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = undefined;
    }
  }

  render() {
    const { clock } = this.state;
    const { race } = this.props;
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
                    bikeIndex={parseInt(bikeIndex, 10)}
                    raceId={race.id}
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
