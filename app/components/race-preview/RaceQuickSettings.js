import React, { Component, PropTypes } from 'react';
import styles from './RacerSelect.css';

const raceTypes = [
  { label: 'Distance Race', value: 'distance' },
  { label: 'Time Trial', value: 'time' }
];

export default class RaceQuickSettings extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    defaultRaceSettings: PropTypes.object.isRequired,
    updateRace: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      saveResults: true,
      distance: props.defaultRaceSettings.raceDistance,
      raceType: raceTypes[0]
    };
  }

  render() {
    const { defaultRaceSettings, race, updateRace } = this.props;
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
                        this.setState({
                          distance: parseInt(e.target.value.replace(/[^\d]/g, ''), 10)
                        });
                      }}
                    />
                  ) : (
                    <div className={styles['race-setting-value']}>
                      {distance} {defaultRaceSettings.raceDistanceUnits}
                    </div>
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
                  if (editing) {
                    // TODO update race
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
