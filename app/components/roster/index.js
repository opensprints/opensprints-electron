import React, { Component, PropTypes } from 'react';
import RosterRacer from './Racer';
import RosterRace from './Race';

export default class Roster extends Component {
  static propTypes = {
    races: PropTypes.array.isRequired,
    addRace: PropTypes.func.isRequired,
    racers: PropTypes.array.isRequired,
    addRacer: PropTypes.func.isRequired,
    editRacer: PropTypes.func
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      selectedRacers: []
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value });
  }

  handleRacerSelect(racer) {
    const { selectedRacers } = this.state;
    if (~selectedRacers.indexOf(racer.id)) {
      this.setState({
        selectedRacers: selectedRacers.filter((id) => id !== racer.id)
      });
    } else {
      this.setState({
        selectedRacers: [...selectedRacers, racer.id]
      });
    }
  }

  render() {
    let input;
    const { search, selectedRacers } = this.state;
    const { races, addRace, racers, addRacer } = this.props;

    return (
      <div className="container">
        <h4>Roster</h4>
        <div className="col-xs-6">
          <div className="row">
            <label>
              Racers
              <input
                type="text"
                placeholder="Search"
                autoFocus="true"
                value={this.state.text}
                onChange={this.handleSearch.bind(this)}
              />
            </label>
          </div>
          <div className="row">
            <ul>
              {racers.filter((racer) => {
                if (search && search && search.trim()) {
                  return ~racer.name.toLowerCase().indexOf(search.trim().toLowerCase());
                }
                return true;
              }).map((racer) => (
                <RosterRacer
                  key={`racer-${racer.id}`}
                  racer={racer}
                  selected={(selectedRacers.indexOf(racer.id) > -1)}
                  onClick={() => this.handleRacerSelect(racer)}
                />
              ))}
            </ul>
          </div>
          <div className="row">
            <label>
              Name
              <input
                ref={node => {
                  input = node;
                }}
                type="text"
              />
            </label>
            <button
              className="btn btn-default"
              onClick={() => {
                if (input.value.trim().length > 0) {
                  addRacer({ name: input.value.trim() });
                  input.value = '';
                }
              }}
            >
              Add Racer
            </button>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="row">
            Race Setup
            <div className="row">
              <button
                className={`btn btn-default${(selectedRacers.length > 0 ? '' : ' disabled')}`}
                onClick={() => {
                  if (selectedRacers.length > 0) {
                    addRace(selectedRacers);
                    this.setState({
                      selectedRacers: []
                    });
                  }
                }}
              >
                Add Race with selected Racers
              </button>
              <ul>
                {races.map((race) => (
                  <RosterRace
                    key={`race-${race.id}`}
                    race={race}
                    racers={race.racers.map(
                      (racerId) => racers.find((racer) => racer.id === racerId)
                    )}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
