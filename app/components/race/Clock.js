import { remote } from 'electron';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layer, Stage } from 'react-konva';
import moment from 'moment';
import styles from './Clock.css';
import Indicator from './Indicator';
import { getDistance } from '../../selectors';

const wallpaperStore = remote.getGlobal('wallpaperStore');

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
    bikeTicks: PropTypes.array.isRequired,
    startTime: PropTypes.object
  };

  static defaultProps = {
    startTime: undefined
  };

  constructor(props) {
    super(props);
    this.state = {
      clock: 0,
      wallpaperSrc: null
    };
  }

  componentDidMount() {
    this.clockWallpaper();
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      clock: this.props.startTime ?
        moment.duration(moment().valueOf() - this.props.startTime.valueOf()) : 0,
      intervalId: setInterval((() => this.setState({
        clock: this.props.startTime ?
          moment.duration(moment().valueOf() - this.props.startTime.valueOf()) : 0
      })), 100)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  onWallpaperLoaded(err, wallpaperSrc) {
    if (err) {
      console.error(err);
      return;
    }
    this.setState({ wallpaperSrc });
  }


  clockWallpaper() {
    const wallpaperFn = this.onWallpaperLoaded.bind(this);
    wallpaperStore.getBackground('raceClock', wallpaperFn);
  }

  render() {
    const clock = this.state.clock || 0;
    const { race, bikes, bikeTicks } = this.props;
    const { wallpaperSrc } = this.state;
    return (
      <div
        className={styles['clock-frame']}
        style={{
          background: wallpaperSrc ? `url(${wallpaperSrc}) center center / 388px 388px no-repeat` : undefined
        }}
      >
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
                .map(strIndex => parseInt(strIndex, 10))
                .filter(bikeIndex => (typeof race.bikeRacerMap[bikeIndex] !== 'undefined'))
                .map(bikeIndex => (
                  <Indicator
                    key={`Indicator-${bikeIndex}`}
                    color={bikes[bikeIndex].color}
                    rotation={
                      getRotation(getDistance(race, bikes[bikeIndex], bikeTicks[bikeIndex]), race)
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
