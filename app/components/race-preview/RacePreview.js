import React, { Component, PropTypes } from 'react';
import RacerEdit from './RacerEdit';
import RaceQuickSettings from './RaceQuickSettings';

export default class RacePreview extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    defaultRaceSettings: PropTypes.object.isRequired,
    updateRace: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    racerAttributes: PropTypes.object.isRequired,
    addNewRacer: PropTypes.func.isRequired,
    editRacer: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    const { races, params, defaultRaceSettings } = props;
    this.state = {
      activeRace: races.find(race => race.id === parseInt(params.race, 10)),
      raceSettings: Object.assign({}, defaultRaceSettings, { raceType: 'distance' })
    };
    this.updateRaceSettings = this.updateRaceSettings.bind(this);
    this.loadRaceClicked = this.loadRaceClicked.bind(this);
    this.swapRacersLeft = this.swapRacersLeft.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { races, params } = nextProps;
    this.setState({
      activeRace: races.find(race => race.id === parseInt(params.race, 10))
    });
  }

  swapRacersLeft(rightBikeIndex) {
    const { activeRace } = this.state;
    const { updateRace } = this.props;
    updateRace(Object.assign({}, activeRace, {
      bikeRacerMap: Object.assign({}, activeRace.bikeRacerMap, {
        [rightBikeIndex - 1]: activeRace.bikeRacerMap[rightBikeIndex],
        [rightBikeIndex]: activeRace.bikeRacerMap[rightBikeIndex - 1]
      })
    }));
  }

  updateRaceSettings(updatedSettings) {
    this.setState({
      raceSettings: updatedSettings
    });
  }

  loadRaceClicked() {
    const { updateRace, push } = this.props;
    const { activeRace, raceSettings } = this.state;
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
    updateRace(Object.assign({}, activeRace, newRaceSettings));
    push(`/race/${activeRace.id}`);
  }

  render() {
    const { activeRace, raceSettings } = this.state;
    const racers = Object.keys(activeRace.bikeRacerMap).map((key) =>
      this.props.racers.find((racer) => racer.id === activeRace.bikeRacerMap[key])
    );
    const { racerAttributes, bikes, updateRace, addNewRacer, editRacer } = this.props;
    return (
      <div className="container">
        <RaceQuickSettings
          updateRaceSettings={this.updateRaceSettings}
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
              onSwap={this.swapRacersLeft}
              onDelete={() => {
                const newRace = Object.assign({}, activeRace, {
                  bikeRacerMap: Object.assign({}, activeRace.bikeRacerMap, {
                    [i]: -1
                  })
                });
                updateRace(newRace);
              }}
              onAdd={racer => addNewRacer(racer, activeRace, i)}
              onEdit={editRacer}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-5 col-xs-2">
            <button
              className="btn btn-primary"
              onClick={this.loadRaceClicked}
            >
              Load Race
            </button>
          </div>
        </div>
      </div>
    );
  }
}
