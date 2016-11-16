import React, { Component, PropTypes } from 'react';
import RosterRace from './Race';

export default class RaceSetup extends Component {
  static propTypes = {
    races: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired
  }

  render() {
    const { races, bikes, racers } = this.props;
    return (
      <div className="col-xs-6">
        <div
          style={{
            paddingLeft: '15px'
          }}
          className="row"
        >
          <div className="form-group">
            <span
              className="control-label text-uppercase"
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                marginBottom: '5px',
                fontWeight: 'bold'
              }}
            >
              Race Setup
            </span>
          </div>

          <div
            style={{
              height: '36px'
            }}
          />

          <div
            style={{
              height: '450px',
              backgroundColor: '#0079A1',
              padding: '10px'
            }}
          >
            {races.map((race) => (
              <RosterRace
                key={`race-${race.id}`}
                race={race}
                bikes={bikes}
                racers={race.bikeRacerMap.map(
                  (racerId) => racers.find((racer) => racer.id === racerId)
                )}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
