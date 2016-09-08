import React, { Component } from 'react';
import styles from './RacerSelect.css';

const raceTypes = [
  { label: 'Distance Race', value: 'distance' },
  { label: 'Time Trial', value: 'time' }
];

export default class RaceQuickSettings extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
      saveResults: false,
      distance: '200.0',
      raceType: raceTypes[0]
    };
  }

  render() {
    const { editing, raceType, saveResults, distance } = this.state;
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
                          this.setState({ raceType: type });
                        }}
                      >
                        <i className="material-icons">
                          {type.value === raceType.value ?
                            'check_circle' : 'radio_button_unchecked'
                          }
                        </i>
                        {type.label}
                      </div>
                    ))
                  : (
                    <div className={styles['race-setting-value']}>
                      {raceType.label}
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
                      value={distance}
                      onChange={(e) => {
                        // TODO add validation for input values
                        this.setState({ distance: e.target.value });
                      }}
                    />
                  ) : (
                    <div className={styles['race-setting-value']}>{distance} meters</div>
                  )}
                </div>
                <div className="col-xs-4 form-group">
                  <div>{'\u00A0'}</div>
                  <div
                    className={styles['race-setting-value']}
                    onClick={() => {
                      this.setState({ saveResults: !saveResults });
                    }}
                  >
                    <i className="material-icons">
                      {saveResults ? 'check_circle' : 'radio_button_unchecked'}
                    </i>
                    Saving Results
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-2 form-group">
              <div>{'\u00A0'}</div>
              <button
                className="btn btn-default btn-xs pull-right"
                onClick={() => {
                  this.setState({ editing: !editing });
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
