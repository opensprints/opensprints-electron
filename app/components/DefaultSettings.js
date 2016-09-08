import React, { Component, PropTypes } from 'react';

const StandardSelect = ({ selectProps = {}, children }) => {
  const { style } = selectProps;
  return (
    <div className="select-container">
      <select
        className="form-control"
        {...selectProps}
        style={Object.assign({}, {
          color: '#6FDCFF',
          fontSize: '18px',
          lineHeight: '18px',
          fontWeight: 'bold',
          borderColor: '#0079A1'
        }, style)}
      >
        {children}
      </select>
      <span className="form-control-feedback">
        <i
          style={{
            color: (style && style.color) ? style.color : '#6FDCFF'
          }}
          className="material-icons md-36"
        >
          arrow_drop_down
        </i>
      </span>
    </div>
  );
};
StandardSelect.propTypes = {
  selectProps: PropTypes.object,
  children: PropTypes.array
};

export default class DefaultSettings extends Component {
  static propTypes = {
    bikes: PropTypes.array.isRequired,
    updateBikesAvailable: PropTypes.func.isRequired,
    updateBikeConfiguration: PropTypes.func.isRequired,
  }
  render() {
    const { bikes, updateBikesAvailable, updateBikeConfiguration } = this.props;
    return (
      <div className="container">
        <h2>Default Settings</h2>

        {/* First Horizontal Row of Settings */}
        <div className="row">

          {/* First Column of Settings */}
          <div className="col-xs-4">
            <div className="form-group">
              <label className="text-uppercase">
                Number of Bikes
              </label>
              <div>
                <StandardSelect
                  selectProps={{
                    style: {
                      width: '90px'
                    },
                    onChange: (e) => { updateBikesAvailable(parseInt(e.target.value, 10)); },
                    value: bikes.length
                  }}
                >
                  {[2, 4].map((num) => (
                    <option key={`bikeNum-option-${num}`} value={num}>
                      {num}
                    </option>
                  ))}
                </StandardSelect>
              </div>
            </div>
            <div className="form-group">
              <label className="text-uppercase">
                Roller Diameter
              </label>
              {bikes.map((bike, i) => (
                <div className="input-group inline" key={`bike-${i}-rollerDiameter`}>
                  <div
                    className="col-xs-4"
                    style={{
                      padding: '3px 3px 3px 0'
                    }}
                  >
                    <div className="input-context">
                      <div style={{ position: 'relative' }}>
                        <span>{i + 1}</span>
                      </div>
                    </div>
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
                      value={bike.rollerDiameter.value}
                      onChange={(e) => {
                        // TODO add validation for input values
                        const newBike = Object.assign({}, bike);
                        newBike.rollerDiameter.value = e.target.value;
                        updateBikeConfiguration(i, newBike);
                      }}
                    />
                  </div>
                  <div
                    className="col-xs-6"
                    style={{
                      padding: '3px 0 3px 2px'
                    }}
                  >
                    <StandardSelect
                      selectProps={{
                        style: {
                          width: '130px'
                        },
                        onChange: (e) => {
                          const newBike = Object.assign({}, bike);
                          newBike.rollerDiameter.unit = e.target.value;
                          updateBikeConfiguration(i, newBike);
                        },
                        value: bike.rollerDiameter.unit
                      }}
                    >
                      <option value="inch">inches</option>
                      <option value="centimeter">centimeters</option>
                    </StandardSelect>
                  </div>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label className="text-uppercase">
                Racer Colors
              </label>
              <div>
                Ye old color pickers will be here
              </div>
            </div>

            <div className="form-group">
              <label className="text-uppercase">
                Racer Roster Options
              </label>
              <div className="checkbox unselectable">
                <i className="material-icons">check_box</i>
                <label
                  style={{
                    fontSize: '24px'
                  }}
                >
                  Sex
                </label>
              </div>
              <div className="checkbox unselectable">
                <i className="material-icons">check_box_outline_blank</i>
                <label
                  style={{
                    fontSize: '24px'
                  }}
                >
                  Racer Level
                </label>
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
