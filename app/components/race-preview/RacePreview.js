import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RacerEdit from './RacerEdit';
import RaceQuickSettings from './RaceQuickSettings';

export default class RacePreview extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    defaultRaceSettings: PropTypes.object.isRequired,
    updateRace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    racerAttributes: PropTypes.object.isRequired,
    addNewRacer: PropTypes.func.isRequired,
    editRacer: PropTypes.func.isRequired
  };

  constructor(props, context) {
    super(props, context);
    const { defaultRaceSettings, race } = props;
    this.state = {
      raceSettings: Object.assign({}, defaultRaceSettings, {
        raceType: 'distance'
      }, race)
    };
  }

  swapRacersLeft(rightBikeIndex) {
    const { updateRace, race } = this.props;
    updateRace(Object.assign({}, race, {
      bikeRacerMap: Object.assign({}, race.bikeRacerMap, {
        [rightBikeIndex - 1]: race.bikeRacerMap[rightBikeIndex],
        [rightBikeIndex]: race.bikeRacerMap[rightBikeIndex - 1]
      })
    }));
  }

  updateRaceSettings(updatedSettings) {
    updatedSettings.raceDistance
    this.setState({
      raceSettings: updatedSettings
    });
  }

  loadRace() {
    const { updateRace, push, race } = this.props;
    const { raceSettings } = this.state;
    const newRaceSettings = raceSettings.raceType === 'distance' ?
      {
        raceType: 'distance',
        raceDistance: raceSettings.raceDistance,
        measurementSystem: raceSettings.measurementSystem
      } :
      {
        raceType: 'time',
        trialDuration: raceSettings.trialDuration,
        timerDirection: raceSettings.timerDirection,
        measurementSystem: raceSettings.measurementSystem
      };
    updateRace(Object.assign({}, race, newRaceSettings));
    push(`/race/${race.id}`);
  }

  render() {
    const { race, racerAttributes, bikes, updateRace, addNewRacer, editRacer } = this.props;
    const { raceSettings } = this.state;
    const racers = Object.keys(race.bikeRacerMap).map(key =>
      this.props.racers.find(racer => racer.id === race.bikeRacerMap[key])
    );

    return (
      <div className="container">
        <RaceQuickSettings
          updateRaceSettings={this.updateRaceSettings.bind(this)}
          raceSettings={raceSettings}
        />
        <div className="row">
          {bikes.map((bike, i) => (
            <RacerEdit
              racerAttributes={racerAttributes}
              key={`QuickRacerDisplay-${i}`}
              bikeIndex={i}
              bikesLength={bikes.length}
              bike={bike}
              racer={racers[i]}
              onSwap={this.swapRacersLeft.bind(this)}
              onDelete={() => {
                const newRace = Object.assign({}, race, {
                  bikeRacerMap: Object.assign({}, race.bikeRacerMap, {
                    [i]: -1
                  })
                });
                updateRace(newRace);
              }}
              onAdd={racer => addNewRacer(racer, race, i)}
              onEdit={editRacer}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-5 col-xs-2">
            <button
              className="btn btn-primary"
              onClick={this.loadRace.bind(this)}
            >
              Load Race
            </button>
          </div>
        </div>
      </div>
    );
  }
}
