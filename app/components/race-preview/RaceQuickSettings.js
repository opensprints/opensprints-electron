import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './RacerSelect.css';

const raceTypes = [
  { label: 'Distance Race', value: 'distance' },
  { label: 'Time Trial', value: 'time' }
];

export default class RaceQuickSettings extends Component {
  static propTypes = {
    raceSettings: PropTypes.object.isRequired,
    updateRaceSettings: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { raceSettings } = this.props;
    this.state = {
      editing: false,
      raceType: raceSettings.raceType,
      raceDistance: raceSettings.raceDistance,
      raceDistanceUnits: raceSettings.raceDistanceUnits,
      trialDuration: raceSettings.trialDuration
    };
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { raceSettings } = nextProps;
    this.setState({
      raceType: raceSettings.raceType,
      raceDistance: raceSettings.raceDistance,
      raceDistanceUnits: raceSettings.raceDistanceUnits,
      trialDuration: raceSettings.trialDuration
    });
  }

  saveChanges() {
    const { raceType, raceDistance, raceDistanceUnits, trialDuration } = this.state;
    this.props.updateRaceSettings({
      raceType,
      raceDistance,
      raceDistanceUnits,
      trialDuration
    });
  }

  render() {
    const { editing, raceType, raceDistance, raceDistanceUnits } = this.state;
    return (
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <h4>Review Race Settings</h4>
          <hr className="heading" />
          <div className="row">
            <div className="col-xs-10">
              <div className="row">
                <div className="col-xs-4 form-group">
                  <label>Race Type</label>
                  {editing ?
                    raceTypes.map((type, i) => (
                      <div
                        className={styles['race-setting-value']}
                        key={`raceType-${i}`}
                        onClick={() => {
                          this.setState({ raceType: type.value });
                        }}
                      >
                        <i className="material-icons">
                          {type.value === raceType ?
                            'check_circle' : 'radio_button_unchecked'
                          }
                        </i>
                        {type.label}
                      </div>
                    ))
                  : (
                    <div className={styles['race-setting-value']}>
                      {raceTypes.find(type => type.value === raceType).label}
                    </div>
                  )}
                </div>
                <div className="col-xs-4 form-group">
                  <label>Distance</label>
                  {editing ? (
                    <input
                      style={{
                        border: '1px solid #0079A1',
                        background: 'transparent',
                        color: '#6FDCFF',
                        fontSize: '18px',
                        lineHeight: '18px',
                        fontWeight: 'bold'
                      }}
                      className="form-control context"
                      type="text"
                      value={raceDistance}
                      onChange={(e) => {
                        this.setState({
                          raceDistance: parseInt(e.target.value.replace(/[^\d]/g, ''), 10)
                        });
                      }}
                    />
                  ) : (
                    <div className={styles['race-setting-value']}>
                      {raceDistance} {raceDistanceUnits}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-xs-2 form-group">
              <div>{'\u00A0'}</div>
              <button
                className="btn btn-default btn-xs pull-right"
                onClick={() => {
                  if (editing) {
                    this.saveChanges();
                  }
                  this.setState({ editing: !editing });
                }}
              >
                {!editing ? 'Edit' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
