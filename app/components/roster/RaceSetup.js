import React, { Component, PropTypes } from 'react';
import Dropdown from 'react-dropdown';
import RosterRace from './Race';

const options = [
  { value: 'unfinished', label: 'Unfinished Races' },
  { value: 'finished', label: 'Finished Races' },
  { value: 'deleted', label: 'Deleted Races' },
  { value: 'all', label: 'All Races' }
];

export default class RaceSetup extends Component {
  static propTypes = {
    races: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      raceFilterValue: options[0]
    };
  }

  onFilterChange(selected) {
    this.setState({
      raceFilterValue: selected
    });
    console.log(selected);
  }

  render() {
    const { raceFilterValue } = this.state;
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
          >
            <Dropdown
              options={options}
              onChange={this.onFilterChange.bind(this)}
              value={raceFilterValue}
              placeholder="Select a Race Filter"
            />
          </div>

          <div
            style={{
              height: '450px',
              backgroundColor: '#0079A1',
              padding: '10px',
              overflowX: 'hidden',
              overflowY: races.length > 4 ? 'scroll' : undefined
            }}
          >
            {races.map((race) => (
              <RosterRace
                {...this.props}
                key={`race-${race.id}`}
                race={race}
                bikes={bikes}
                races={races}
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
