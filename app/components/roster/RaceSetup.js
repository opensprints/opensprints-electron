import React, { Component, PropTypes } from 'react';
import Dropdown from './Dropdown';
import StaticDropdown from './StaticDropdown';
import RosterRace from './Race';
import style from './RaceSetup.css';

const options = [
  { value: 'unfinished', label: 'Unfinished Races' },
  { value: 'finished', label: 'Finished Races' },
  { value: 'deleted', label: 'Deleted Races' },
  { value: 'all', label: 'All Races' }
];

const gearOptions = [
  { value: 'defaultSettings', label: 'Go to Default Settings' },
  { value: 'raceResults', label: 'Download Race Results (.csv)' }
];

const raceFilters = {
  unfinished: (race) => (!race.finished && !race.deleted),
  finished: (race) => (race.finished && !race.deleted),
  deleted: (race) => (race.deleted),
  all: () => (true)
};

const filteredRaces = (races, filter) => races.filter(raceFilters[filter]);

export default class RaceSetup extends Component {
  static propTypes = {
    races: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    push: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      raceFilter: options[0],
      gearMenuOpen: false
    };
  }

  onFilterChange(selected) {
    this.setState({
      raceFilter: selected
    });
  }

  gearOptionClicked(value) {
    if (value === 'defaultSettings') {
      this.props.push('/default-settings');
    } else if (value === 'raceResults') {
      // TODO export race results somehow
    }
  }

  render() {
    const { raceFilter, gearMenuOpen } = this.state;
    const { bikes, racers } = this.props;
    const races = filteredRaces(this.props.races, raceFilter.value);
    const gear = (
      <i className={`material-icons md-36 ${style.gear} ${gearMenuOpen ? style.open : ''}`}>
        settings_applications
      </i>
    );
    return (
      <div className="col-xs-6">
        <div
          style={{
            paddingLeft: '15px'
          }}
          className="row"
        >
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

          <div
            style={{
              height: '36px',
              marginBottom: '15px'
            }}
          >
            <Dropdown
              options={options}
              onChange={this.onFilterChange.bind(this)}
              value={raceFilter}
              placeholder="Select a Race Filter"
            />
            <div className="pull-right">
              <StaticDropdown
                label={gear}
                options={gearOptions}
                onOptionClicked={this.gearOptionClicked.bind(this)}
              />
            </div>
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
        <div
          className="row"
          style={{
            margin: '15px -15px 15px 15px'
          }}
        >
          <div className="pull-right">
            <button className="btn btn-default">
              Clear All Races
            </button>
            <button className="btn btn-default">
              Start All Races
            </button>
          </div>
        </div>
      </div>
    );
  }
}
