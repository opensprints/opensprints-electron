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
    startSpecificRace: PropTypes.func.isRequired,
    removeRace: PropTypes.func.isRequired,
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

  gearOptionClicked(option) {
    const { push } = this.props;
    if (option.value === 'defaultSettings') {
      push('/default-settings');
    } else if (option.value === 'raceResults') {
      // TODO export race results somehow
    }
  }

  render() {
    const { raceFilter, gearMenuOpen } = this.state;
    const { bikes, racers, removeRace, push } = this.props;
    const unfinishedRaces = this.props.races.filter(raceFilters.unfinished);
    const races = filteredRaces(this.props.races, raceFilter.value);
    const startSpecificRace = races.length > 0 ?
      this.props.startSpecificRace.bind(null, races[0].id) : this.props.startSpecificRace;
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
                baseClassName="gearMenu Dropdown"
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
                startSpecificRace={startSpecificRace}
                racers={Object.keys(race.bikeRacerMap).map((key) =>
                  racers.find((racer) => racer.id === race.bikeRacerMap[key])
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
            <button
              className={`btn btn-default${(unfinishedRaces.length > 0 ? '' : ' disabled')}`}
              onClick={() => {
                unfinishedRaces.forEach((r) => {
                  removeRace(r.id);
                });
              }}
            >
              Clear All Races
            </button>
            <button
              className={`btn btn-default${(unfinishedRaces.length > 0 ? '' : ' disabled')}`}
              onClick={() => {
                if (unfinishedRaces.length > 0) {
                  push(`/race-preview/${unfinishedRaces[0].id}`);
                }
              }}
            >
              Start All Races
            </button>
          </div>
        </div>
      </div>
    );
  }
}
