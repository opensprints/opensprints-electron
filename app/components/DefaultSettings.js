import React, { Component, PropTypes } from 'react';

class DefaultSettings extends Component {
  static propTypes = {
    updateSettings: PropTypes.func,
    defaultSettings: PropTypes.object
  }
  render() {
    const { updateSettings, defaultSettings } = this.props;
    // const { numOfBikes } = defaultSettings;
    return (
      <div className="container">
        <h4>Default Settings</h4>
        <div className="row">
          <div className="col-xs-12 col-sm-6">
            <div className="row">
              <div className="input-group inline">
                <label>
                  Number of Bikes
                  <select
                    onChange={(e) => updateSettings({
                      key: 'numOfBikes',
                      value: parseInt(e.target.value, 10)
                    })}
                    value={defaultSettings.numOfBikes}
                  >
                    {[2, 4].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DefaultSettings;
