import React, { Component, PropTypes } from 'react';
import styles from './RacerSelect.css';

export default class PreRaceReview extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    races: PropTypes.array,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeRace: props.races.find((race) => race.id === parseInt(props.params.race, 10))
    };
  }

  render() {
    const racers = this.props.racers.filter(
      (racer) => this.state.activeRace.racers.indexOf(racer.id) >= 0
    );
    const { bikes } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            Race Settings Preview
          </div>
        </div>
        <div className="row">
          {racers.map((racer, i) => (
            <div
              key={`racer-select-${i}`}
              className={`${styles['racer-select']} col-xs-3`}
            >
              <div
                className={styles['bike-indicator']}
                style={{ backgroundColor: bikes[i].color }}
              >
                {i + 1}
              </div>
              <div className={styles['racer-select-container']}>
                <label className={styles.name}>{racer.name}</label>
              </div>
              <div className={styles['change-racer-btn']}>change</div>
            </div>
            ))}
        </div>
      </div>
    );
  }
}
