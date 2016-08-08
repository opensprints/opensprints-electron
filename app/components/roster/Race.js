import React, { Component, PropTypes } from 'react';

export default class RosterRace extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    racers: PropTypes.array.isRequired,
  };

  render() {
    const { race, racers } = this.props;

    return (
      <li>
        Race {race.id + 1}
        <button className="btn btn-default">
          Start Race
        </button>
        <ul>
          {racers.map((racer) => (
            <li key={`race-${race.id}-racer-${racer.id}`}>
              {racer.name}
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
