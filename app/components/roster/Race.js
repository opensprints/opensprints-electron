import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Race.css';

const RaceLabel = (props) => {
  const { races, race } = props;
  const position = races.indexOf(race);
  let raceLabel = `Race ${position + 1}`;
  if (race.deleted) {
    raceLabel = `Deleted ${race.deletedDate.fromNow()}`;
  } else if (race.finished) {
    raceLabel = `Race Finished ${race.finishedDate.fromNow()}`;
  }
  return (
    <span className={style.name}>
      {raceLabel}
    </span>
  );
};

RaceLabel.propTypes = {
  races: PropTypes.array.isRequired,
  race: PropTypes.object.isRequired
};

export default class RosterRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    removeRace: PropTypes.func.isRequired,
    changeRaceOrder: PropTypes.func.isRequired,
    startSpecificRace: PropTypes.func.isRequired
  };

  static hideDeletedStyle(race) {
    return { display: race.deleted ? 'none' : null };
  }

  render() {
    const {
      race, races, racers, bikes, removeRace, changeRaceOrder, startSpecificRace
    } = this.props;
    const position = races.indexOf(race);
    return (
      <div className={`${style.raceContainer}`}>
        <div className={`${style.raceOptionsRow}`}>
          <RaceLabel {...this.props} />
          <i
            className={`material-icons md-24 unselectable ${style.action}`}
            style={RosterRace.hideDeletedStyle(race)}
            onClick={() => startSpecificRace(race.id)}
          >
            play_circle_filled
          </i>
          <i
            className={`material-icons md-24 unselectable ${style.action}`}
            style={RosterRace.hideDeletedStyle(race)}
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
              style={RosterRace.hideDeletedStyle(race)}
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
              style={RosterRace.hideDeletedStyle(race)}
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
            const key = `race-${race.id}-bike-${i}`;
            if (racer) {
              return (
                <div
                  key={key}
                  className={style.bikeContainer}
                >
                  <span>{racer.name}</span>
                </div>
              );
            }
            // TODO get racers selected and display icon for adding them to this race
            return (
              <div
                key={key}
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
