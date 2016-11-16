import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './Race.css';

export default class RosterRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired
  };

  render() {
    const { race, racers, bikes } = this.props;
    return (
      <div>
        <div className={`col-xs-12 ${style.raceOptionsRow}`}>
          <span
            style={{
              verticalAlign: 'middle'
            }}
          >
            Race {race.id + 1}
          </span>
          <Link to={`race-preview/${race.id}`}>
            <i className={`material-icons md-24 unselectable ${style.action}`}>
              play_circle_filled
            </i>
          </Link>
          <i className={`material-icons md-24 unselectable ${style.action}`}>
            delete
          </i>
          <div
            style={{
              float: 'right'
            }}
          >
            <i className={`material-icons md-24 unselectable ${style.action}`}>
              arrow_upward
            </i>
            <i className={`material-icons md-24 unselectable ${style.action}`}>
              arrow_downward
            </i>
          </div>
        </div>
        <div>
          {bikes.map((_, i) => {
            const racer = racers[i];
            if (racer) {
              return (
                <div
                  key={`race-${race.id}-bike-${i}`}
                  className={`col-xs-3 ${style.bikeContainer}`}
                >
                  <span>{racer.name}</span>
                </div>
              );
            }
            // TODO get racers selected and display icon for adding them to this race
            return (
              <div
                key={`race-${race.id}-bike-${i}`}
                className={`col-xs-3 ${style.bikeContainer}`}
              >
                <span />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
