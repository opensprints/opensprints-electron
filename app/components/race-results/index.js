import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RacerDisplay from './RacerDisplay';

export default class RacePreview extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    onAdHocRaceClick: PropTypes.func.isRequired,
    goToNextRace: PropTypes.func.isRequired,
    goToRoster: PropTypes.func.isRequired,
    nextRace: PropTypes.object
  };

  static defaultProps = {
    nextRace: null
  };

  render() {
    const {
      race,
      racers,
      bikes,
      onAdHocRaceClick,
      nextRace,
      goToNextRace,
      goToRoster
    } = this.props;
    return (
      <div className="container">
        <div className="row">
          {Object.keys(race.bikeRacerMap).map((_, i) => (
            <RacerDisplay
              key={`RacerDisplay-${i}`}
              bikeIndex={i}
              bike={bikes[i]}
              racer={racers.find(racer => racer.id === race.bikeRacerMap[i])}
              race={race}
              classNames={
                Object.keys(race.bikeRacerMap).length < 4 && i === 0 ? 'col-xs-offset-3' : ''}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            <button
              className="btn btn-default"
              onClick={onAdHocRaceClick}
            >
              Ad Hoc Race
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (nextRace) {
                  goToNextRace(nextRace);
                } else {
                  goToRoster();
                }
              }}
            >
              {nextRace !== undefined ? 'Next Race' : 'All Races Finished'}
            </button>
          </div>
        </div>
        <div className="row">
          <span />
        </div>
      </div>
    );
  }
}
