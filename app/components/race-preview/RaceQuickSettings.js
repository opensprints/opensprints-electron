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
    this.state = {
      editing: false
    };
  }

  render() {
    const { editing } = this.state;
    const { raceSettings, updateRaceSettings } = this.props;
    const { raceType, raceDistance, raceDistanceUnits } = raceSettings;
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
                          updateRaceSettings(Object.assign({}, raceSettings, {
                            raceType: type.value
                          }));
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
                        let newDistance = parseInt(e.target.value.replace(/[^\d]/g, ''), 10);
                        if (Number.isNaN(newDistance)) {
                          newDistance = 0;
                        }
                        updateRaceSettings(Object.assign({}, raceSettings, {
                          raceDistance: newDistance
                        }));
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
                  // TODO Need validation for non-zero distance values
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
