import React, { Component, PropTypes } from 'react';
import RacerDisplay from './RacerDisplay';

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
      activeRace: {
        id: 0,
        bikeRacerMap: { 0: 0, 1: 1, 2: 2, 3: 3 },
        results: [
          { place: 3 },
          { place: 2 },
          { place: 1 },
          { place: 4 }
        ]
      }
      // props.races.find((race) => race.id === parseInt(props.params.race, 10))
    };
  }

  render() {
    const { activeRace } = this.state;
    const racers = Object.keys(activeRace.bikeRacerMap).map((key) =>
      [
        { id: 0, name: 'Speed' },
        { id: 1, name: 'Jonathan' },
        { id: 2, name: 'Nick' },
        { id: 3, name: 'Monk' }
      ]
      /* this.props.racers */
        .find((racer) => racer.id === activeRace.bikeRacerMap[key])
    );
    const { bikes } = this.props;
    return (
      <div className="container">
        <div className="row">
          {bikes.map((bike, i) => (
            <RacerDisplay
              key={`RacerDisplay-${i}`}
              bikeIndex={i}
              bike={bike}
              racer={racers[i]}
              race={activeRace}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-4 col-xs-4">
            <button className="btn btn-default">Ad Hoc Race</button>
            <button className="btn btn-primary">Next Race</button>

          </div>
        </div>
      </div>
    );
  }
}
