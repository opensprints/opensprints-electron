import React, { Component, PropTypes } from 'react';
import RacerEdit from './RacerEdit';
import RaceQuickSettings from './RaceQuickSettings';

export default class RacePreview extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
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
    const racers = this.state.activeRace.bikeRacerMap.map(
      (racerId) => this.props.racers.find((racer) => racer.id === racerId)
    );
    const { bikes } = this.props;
    return (
      <div className="container">
        <RaceQuickSettings />
        <div className="row">
          {bikes.map((bike, i) => (
            <RacerEdit
              key={`QuickRacerDisplay-${i}`}
              bikeIndex={i}
              bike={bike}
              racer={racers[i]}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-5 col-xs-2">
            <button className="btn btn-primary">Load Race</button>
          </div>
        </div>
      </div>
    );
  }
}
