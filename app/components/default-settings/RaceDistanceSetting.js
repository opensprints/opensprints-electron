import React, { Component, PropTypes } from 'react';
import Select from './Select';

export default class RaceDistanceSetting extends Component {
  static propTypes = {
    defaultRaceSettings: PropTypes.object.isRequired,
    changeDefaultRaceSetting: PropTypes.func.isRequired
  }

  render() {
    const { defaultRaceSettings, changeDefaultRaceSetting } = this.props;
    return (
      <div className="row">
        <div className="input-group inline">
          <label htmlFor="distance-input" className="group-heading text-uppercase">
            Race Distance
          </label>
          <div className="input-group inline">
            <div
              className="col-xs-4"
              style={{
                padding: '3px 3px 3px 0'
              }}
            >
              <div style={{ position: 'relative' }}>
                <input
                  id="distance-input"
                  style={{
                    padding: '6px 10px'
                  }}
                  className="form-control context"
                  type="text"
                  value={defaultRaceSettings.raceDistance}
                  onChange={() => {
                    // TODO add validation for input values
                  }}
                />
              </div>
            </div>
            <div
              className="col-xs-4"
              style={{
                padding: '3px 0 3px 2px'
              }}
            >
              <Select
                selectProps={{
                  style: {
                    width: '130px'
                  },
                  onChange: (e) => {
                    changeDefaultRaceSetting('raceDistanceUnits', e.target.value);
                  },
                  value: defaultRaceSettings.raceDistanceUnits
                }}
              >
                <option value="feet">feet</option>
                <option value="meters">meters</option>
              </Select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
