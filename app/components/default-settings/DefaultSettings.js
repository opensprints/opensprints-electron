import React, { Component, PropTypes } from 'react';
import styles from './settings.css';
import Checkbox from './Checkbox';
import Background from './Background';

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

const BikeContext = ({ children }) => (
  <div className={styles.contextContainer}>
    <div style={{ position: 'relative' }}>
      <div className={styles.contextBorder}></div>
      <span className={styles.contextContent}>
        {children}
      </span>
    </div>
  </div>
);
BikeContext.propTypes = {
  children: PropTypes.number
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
                    <div style={{ position: 'relative' }}>
                      <BikeContext>{i + 1}</BikeContext>
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
            <div
              className="form-group"
              style={{ marginBottom: '30px' }}
            >
              <label className="text-uppercase">
                Racer Colors
              </label>
              <div
                className="row"
                style={{
                  marginLeft: 0,
                  marginRight: '35px'
                }}
              >
                {bikes.map((bike, i) => (
                  <div
                    key={`colorPicker-${i}`}
                    className="col-xs-3"
                    style={{
                      paddingLeft: 0,
                      paddingRight: '10px'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <BikeContext>{i + 1}</BikeContext>
                      <div
                        style={{
                          height: '36px',
                          border: '1px solid #6FDCFF',
                          background: bike.color
                        }}
                      />
                      <span className="form-control-feedback">
                        <i
                          style={{ color: '#6FDCFF' }}
                          className="material-icons md-36"
                        >
                          arrow_drop_down
                        </i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="text-uppercase">
                Racer Roster Options
              </label>
              <Checkbox>Sex</Checkbox>
              <Checkbox>Racer Level</Checkbox>
            </div>
          </div>

          {/* Second Column of Settings */}
          <div className="col-xs-12 col-sm-6">

            <div className="row">
              <div className="form-group">
                <label className="text-uppercase">
                  Distance/Speed Units
                </label>
                <div className="input-group">
                  <StandardSelect
                    selectProps={{
                      style: {
                        width: '190px'
                      },
                      onChange: () => {
                        // TODO
                      }
                    }}
                  >
                    <option value="miles">Miles</option>
                    <option value="kilometers">Kilometers</option>
                  </StandardSelect>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="input-group inline">
                <label className="group-heading text-uppercase">
                  Race Distance
                </label>
                <div className="input-group inline">
                  <div
                    className="col-xs-2"
                    style={{
                      padding: '3px 3px 3px 0'
                    }}
                  >
                    <div style={{ position: 'relative' }}>
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
                        defaultValue="200.0"
                        onChange={(e) => {
                          // TODO add validation for input values
                        }}
                      />
                    </div>
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
                        },
                        defaultValue: 'meters'
                      }}
                    >
                      <option value="feet">feet</option>
                      <option value="meters">meters</option>
                    </StandardSelect>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-xs-6">
            <div className="form-group">
              <label className="text-uppercase">
                Race Screen Background
              </label>
              <Background />
            </div>
          </div>
          <div className="col-xs-6">
            <div className="form-group">
              <label className="text-uppercase">
                Race Clock Background
              </label>
              <Background />
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-xs-6">
            <div className="form-group">
              <label className="text-uppercase">
                Intermission Screen Background
              </label>
              <Background />
            </div>
            Add an Intermission Screen Background
          </div>
          <div className="col-xs-6">
            <div className="form-group">
              <label className="text-uppercase">
                Intermission Screen Options
              </label>
              <Checkbox>Show standings</Checkbox>
              <Checkbox>Show upcoming races</Checkbox>
              <Checkbox>Show message (90 character max)</Checkbox>
              <div>
                <textarea
                  className="form-control"
                  style={{
                    fontSize: '24px',
                    backgroundColor: 'transparent',
                    color: '#6FDCFF',
                    border: '1px solid #0079A1'
                  }}
                  defaultValue="We'd like to thank Wal-Mart and the Koch Brothers."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
