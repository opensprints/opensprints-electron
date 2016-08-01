import React, { Component, PropTypes } from 'react';

export default class DefaultSettings extends Component {
  static propTypes = {
    bikes: PropTypes.array,
    updateBikesAvailable: PropTypes.func,
    updateBikeConfiguration: PropTypes.func,
  }
  render() {
    const { bikes, updateBikesAvailable, updateBikeConfiguration } = this.props;
    return (
      <div className="container">
        <h4>Default Settings</h4>

        {/* First Horizontal Row of Settings */}
        <div className="row">

          {/* First Column of Settings */}
          <div className="col-xs-12 col-sm-6">
            <div className="row">
              <div className="input-group inline">
                <label>
                  Number of Bikes
                  <select
                    onChange={(e) => updateBikesAvailable(parseInt(e.target.value, 10))}
                    value={bikes.length}
                  >
                    {[2, 4].map((num) => (
                      <option key={`bikeNum-option-${num}`} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            {bikes.map((bike, i) => (
              <div className="row" key={`bike-${i}-rollerDiameter`}>
                <div className="input-group inline">
                  <label>
                    Roller Diameter
                    <input
                      type="text"
                      value={bike.rollerDiameter.value}
                      onChange={(e) => {
                        // TODO add validation for input values
                        const newBike = Object.assign({}, bike);
                        newBike.rollerDiameter.value = e.target.value;
                        updateBikeConfiguration(i, newBike);
                      }}
                    />
                  </label>
                  <select
                    onChange={(e) => {
                      const newBike = Object.assign({}, bike);
                      newBike.rollerDiameter.unit = e.target.value;
                      updateBikeConfiguration(i, newBike);
                    }}
                    value={bike.rollerDiameter.unit}
                  >
                    <option value="inch">inches</option>
                    <option value="centimeter">centimeters</option>
                  </select>
                </div>
              </div>
            ))}
            <div className="row">
              <label className="group-heading">
                Racer Colors
              </label>
              <div className="row">
                Ye old color pickers will be here
              </div>
            </div>

            <div className="row">
              <label className="group-heading">
                Racer Roster Options
              </label>
              <div className="checkbox changeable">
                <i className="material-icons md-24">check_box</i>
                <label>Sex</label>
              </div>
              <div className="checkbox changeable">
                <i className="material-icons md-24">check_box_outline_blank</i>
                <label>Racer Level</label>
              </div>
            </div>
          </div>

          {/* Second Column of Settings */}
          <div className="col-xs-12 col-sm-6">

            <div className="row">
              <div className="input-group inline">
                <label className="group-heading">
                  Distance/Speed Units
                  <select>
                    <option>Miles</option>
                    <option>Kilometers</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="row">
              <div className="input-group inline">
                <label className="group-heading">
                  Race Distance
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
