import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Modal, Radio } from 'react-bootstrap';
import RosterRacer from './Racer';
import RaceSetup from './RaceSetup';
import style from './roster.css';

const racerAttributeRadioGroup = (key, options, onChange) => (
  <FormGroup
    key={`${key}-option-group`}
    style={{
      float: 'left',
      display: 'inline-block',
      width: '50%',
      paddingLeft: '5px'
    }}
  >
    <span className="label text-uppercase">{key}</span>
    {options.map(option => (
      <Radio
        key={`${option}-radio-btn`}
        name={key}
        value={option}
        onChange={onChange}
      >
        {option}
      </Radio>
    ))}
  </FormGroup>
);

export default class Roster extends Component {
  static propTypes = {
    bikes: PropTypes.array.isRequired,
    races: PropTypes.array.isRequired,
    addRaces: PropTypes.func.isRequired,
    racers: PropTypes.array.isRequired,
    racerAttributes: PropTypes.object.isRequired,
    addRacer: PropTypes.func.isRequired,
    removeRacers: PropTypes.func.isRequired,
    // editRacer: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      search: '',
      previousSearch: '',
      newRacerName: '',
      newRacerAttributes: {},
      selectedRacers: [],
      showModal: false
    };
  }

  handleSearch(e) {
    this.setState({ search: e.target.value });
  }

  handleSelectAllRacers() {
    const { selectedRacers } = this.state;
    const { racers } = this.props;
    if (selectedRacers.length === racers.length) {
      this.setState({
        selectedRacers: []
      });
    } else {
      this.setState({
        selectedRacers: racers.map(racer => (racer.id))
      });
    }
  }

  handleRacerSelect(racer) {
    const { selectedRacers } = this.state;
    if (selectedRacers.indexOf(racer.id) !== -1) {
      this.setState({
        selectedRacers: selectedRacers.filter(id => id !== racer.id)
      });
    } else {
      this.setState({
        selectedRacers: [...selectedRacers, racer.id]
      });
    }
  }

  open() {
    const { search } = this.state;
    const { racerAttributes } = this.props;
    if (Object.keys(racerAttributes).length) {
      this.setState({
        newRacerName: search,
        previousSearch: search,
        search: '',
        showModal: true
      });
    } else {
      this.setState({
        newRacerName: search,
        search: ''
      }, () => {
        this.createRacer();
      });
    }
  }

  cancel() {
    this.setState({
      search: this.state.previousSearch,
      previousSearch: '',
      newRacerName: '',
      newRacerAttributes: {},
      showModal: false
    });
  }

  createRacer() {
    const { newRacerName, newRacerAttributes } = this.state;
    const { addRacer } = this.props;
    if (newRacerName.trim().length) {
      addRacer({
        name: newRacerName.trim(),
        ...newRacerAttributes
      });
      this.setState({
        search: '',
        previousSearch: '',
        newRacerName: '',
        newRacerAttributes: {},
        showModal: false
      });
    }
  }

  checkForEnterKey(e) {
    if (e.keyCode === 13) {
      this.open();
    }
  }

  render() {
    let input;
    const { search, selectedRacers } = this.state;
    const {
      racerAttributes, addRaces, racers, bikes, removeRacers
    } = this.props;

    return (
      <div className="container">
        <h2 style={{ marginBottom: '30px' }}>
          Roster
        </h2>
        <div className="col-xs-6">
          <div
            style={{
              margin: '0 15px 0 -15px'
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
                Racers
              </span>
              <div className="form-inline">
                <div className="form-group" style={{ width: '100%' }}>
                  <input
                    type="text"
                    className="form-control"
                    style={{
                      width: 'calc(100% - 41px)'
                    }}
                    placeholder="Search for or create a new racer..."
                    autoFocus="true"
                    value={this.state.search}
                    onChange={this.handleSearch.bind(this)}
                    onKeyUp={this.checkForEnterKey.bind(this)}
                  />
                  <i
                    className={`material-icons md-36 unselectable ${style.addRacerBtn}`}
                    tabIndex="0"
                    role="button"
                    onClick={() => { this.open(); }}
                    onKeyDown={this.checkForEnterKey.bind(this)}
                  >
                    add_box
                  </i>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              margin: '0 15px 0 -15px'
            }}
            className="row"
          >
            <div
              style={{
                height: '450px',
                backgroundColor: '#0079A1',
                padding: '10px',
                overflowX: 'hidden',
                overflowY: racers.length > 11 ? 'scroll' : undefined
              }}
            >
              <table className={style.racerTable}>
                <thead>
                  <tr>
                    <th
                      className={`${style.racersHeader} unselectable`}
                      onClick={() => this.handleSelectAllRacers()}
                    >
                      <i className="material-icons">
                        {selectedRacers.length === racers.length && racers.length ?
                          'check_box' : 'check_box_outline_blank'
                        }
                      </i>
                    </th>
                    <th className={`${style.racersHeader} unselectable`}>Name</th>
                    {Object.keys(racerAttributes).map(key => (
                      <th
                        className={`${style.racersHeader} unselectable`}
                        key={`${key}-roster-header`}
                      >
                        {key}
                      </th>
                    ))}
                    <th className={`${style.racersHeader} unselectable`}>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {racers.filter((racer) => {
                    if (search && search && search.trim()) {
                      return racer.name.toLowerCase().indexOf(search.trim().toLowerCase()) !== -1;
                    }
                    return true;
                  }).map(racer => (
                    <RosterRacer
                      key={`racer-${racer.id}`}
                      racer={racer}
                      racerAttributes={racerAttributes}
                      selected={(selectedRacers.indexOf(racer.id) > -1)}
                      onClick={() => this.handleRacerSelect(racer)}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div
            className="row"
            style={{
              margin: '15px 15px 15px -15px'
            }}
          >
            <div
              style={{
                float: 'right'
              }}
            >
              <button
                className={`btn btn-default${(selectedRacers.length > 0 ? '' : ' disabled')}`}
                onClick={() => {
                  if (selectedRacers.length > 0) {
                    removeRacers(selectedRacers);
                    this.setState({
                      selectedRacers: []
                    });
                  }
                }}
              >
                Delete Selected
              </button>
              <button
                className={`btn btn-default${(selectedRacers.length > 0 ? '' : ' disabled')}`}
                onClick={() => {
                  if (selectedRacers.length > 0) {
                    addRaces(bikes, selectedRacers);
                    this.setState({
                      selectedRacers: []
                    });
                  }
                }}
              >
                Add Race with selected Racers
              </button>
            </div>
          </div>
        </div>

        <RaceSetup {...this.props} />

        <Modal
          show={this.state.showModal}
          onHide={() => { this.cancel(); }}
          animation={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Racer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label htmlFor="newRacerName" className="control-label text-uppercase">Name</label>
              <input
                className="form-control"
                type="text"
                id="newRacerName"
                value={this.state.newRacerName}
                onChange={(e) => {
                  this.setState({ newRacerName: e.target.value });
                }}
              />
            </div>

            {
              Object.keys(racerAttributes).map(key => (
                racerAttributeRadioGroup(key, racerAttributes[key], (e) => {
                  const { newRacerAttributes } = this.state;
                  this.setState({
                    newRacerAttributes: Object.assign(
                      {},
                      newRacerAttributes,
                      { [key]: e.target.value }
                    )
                  });
                })
              ))
            }
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={() => { this.cancel(); }}
            >
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={() => {
                this.createRacer();
              }}
            >
              Save
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
