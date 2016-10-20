import React, { Component, PropTypes } from 'react';
import { Modal } from 'react-bootstrap';
import RosterRacer from './Racer';
import RosterRace from './Race';
import style from './roster.css';

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
      previousSearch: '',
      newRacerName: '',
      selectedRacers: [],
      showModal: false
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

  open() {
    const { search } = this.state;
    this.setState({
      newRacerName: search,
      previousSearch: search,
      search: '',
      showModal: true
    });
  }

  cancel() {
    this.setState({
      search: this.state.previousSearch,
      previousSearch: '',
      newRacerName: '',
      showModal: false
    });
  }

  render() {
    let input;
    const { search, selectedRacers } = this.state;
    const { races, addRace, racers, addRacer } = this.props;

    return (
      <div className="container">
        <h2 style={{ marginBottom: '30px' }}>
          Roster
        </h2>
        <div className="col-xs-6">
          <div className="row">
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
                Racers
              </span>
              <div className="form-inline">
                <div className="form-group" style={{ width: '100%' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      width: '80%'
                    }}
                    placeholder="Search for or create a new racer..."
                    autoFocus="true"
                    value={this.state.search}
                    onChange={this.handleSearch.bind(this)}
                  />
                  <i
                    className={`material-icons md-36 unselectable ${style.addRacerBtn}`}
                    tabIndex="0"
                    onClick={() => { this.open(); }}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        this.open();
                      }
                    }}
                  >
                    add_box
                  </i>
                </div>
              </div>
            </div>
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
