import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './Race.css';

export default class RosterRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    removeRace: PropTypes.func.isRequired,
    changeRaceOrder: PropTypes.func.isRequired
  };

  render() {
    const { race, races, racers, bikes, removeRace, changeRaceOrder } = this.props;
    const position = races.indexOf(race);
    return (
      <div className={`${style.raceContainer} col-xs-12`}>
        <div className={`col-xs-12 ${style.raceOptionsRow}`}>
          <span
            style={{
              verticalAlign: 'middle'
            }}
          >
            Race {position + 1}
          </span>
          <Link to={`race-preview/${race.id}`}>
            <i className={`material-icons md-24 unselectable ${style.action}`}>
              play_circle_filled
            </i>
          </Link>
          <i
            className={`material-icons md-24 unselectable ${style.action}`}
            onClick={() => removeRace(race.id)}
          >
            delete
          </i>
          <div
            style={{
              float: 'right'
            }}
          >
            <i
              className={
                `material-icons md-24 unselectable ${style.action}
                ${position === 0 ? style.disabled : ''}`
              }
              onClick={() => {
                if (position !== 0) {
                  changeRaceOrder(race.id, races[races.indexOf(race) - 1].id);
                }
              }}
            >
              arrow_upward
            </i>
            <i
              className={
                `material-icons md-24 unselectable ${style.action}
                ${position === races.length - 1 ? style.disabled : ''}`
              }
              onClick={() => {
                if (position !== races.length - 1) {
                  changeRaceOrder(race.id, races[races.indexOf(race) + 1].id);
                }
              }}
            >
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
                  className={style.bikeContainer}
                >
                  <span>{racer.name}</span>
                </div>
              );
            }
            // TODO get racers selected and display icon for adding them to this race
            return (
              <div
                key={`race-${race.id}-bike-${i}`}
                className={style.bikeContainer}
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
