import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from './Checkbox';
import Background from './Background';
import Select from './Select';
import RaceDurationSetting from './RaceDurationSetting';
import RaceDistanceSetting from './RaceDistanceSetting';
import TimerDirectionSetting from './TimerDirectionSetting';
import BikeContext from './BikeContext';
import MessageSettings from './MessageSettings';

const RaceScreenSettings = () => (
  <div className="row">
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Race Screen Background
        </span>
        <Background bKey="raceScreen" />
      </div>
    </div>
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Race Clock Background
        </span>
        <Background bKey="raceClock" />
      </div>
    </div>
  </div>
);

const IntermissionScreenSettings = () => (
  <div className="row">
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Intermission Screen Background
        </span>
        <Background bKey="intermissionScreen" />
      </div>
      <i className="material-icons">add_circle</i>
      Add an Intermission Screen Background
    </div>
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Intermission Screen Options
        </span>
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
            defaultValue="We'd like to thank Elon Musk."
          />
        </div>
      </div>
    </div>
  </div>
);

const BikeCount = ({ bikes, updateBikesAvailable }) => (
  <div className="form-group">
    <label htmlFor="select-bikes" className="text-uppercase">
      Number of Bikes
    </label>
    <div>
      <Select
        selectProps={{
          id: 'select-bikes',
          style: {
            width: '90px'
          },
          onChange: (e) => { updateBikesAvailable(parseInt(e.target.value, 10)); },
          value: bikes.length
        }}
      >
        {[2, 4].map(num => (
          <option key={`bikeNum-option-${num}`} value={num}>{num}</option>
        ))}
      </Select>
    </div>
  </div>
);
BikeCount.propTypes = {
  bikes: PropTypes.array.isRequired,
  updateBikesAvailable: PropTypes.func.isRequired
};

const BikeRollerDimensions = ({ bikes, updateBikeConfiguration }) => (
  <div className="form-group">
    <span className="label text-uppercase">
      Roller Diameter
    </span>
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
          <Select
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
          </Select>
        </div>
      </div>
    ))}
  </div>
);
BikeRollerDimensions.propTypes = {
  bikes: PropTypes.array.isRequired,
  updateBikeConfiguration: PropTypes.func.isRequired
};

export default class DefaultSettings extends Component {
  static propTypes = {
    bikes: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    updateBikesAvailable: PropTypes.func.isRequired,
    updateBikeConfiguration: PropTypes.func.isRequired,
    updateMessageText: PropTypes.func.isRequired,
    racerAttributes: PropTypes.object.isRequired,
    toggleAttribute: PropTypes.func.isRequired,
    changeDefaultRaceSetting: PropTypes.func.isRequired,
    defaultRaceSettings: PropTypes.object.isRequired
  };

  render() {
    const {
      bikes,
      updateBikesAvailable,
      updateBikeConfiguration,
      racerAttributes,
      toggleAttribute,
      changeDefaultRaceSetting,
      defaultRaceSettings,
      messages,
      updateMessageText
    } = this.props;

    return (
      <div className="container">
        <h2>Default Settings</h2>

        {/* First Horizontal Row of Settings */}
        <div className="row">

          {/* First Column of Settings */}
          <div className="col-xs-4">
            <BikeCount bikes={bikes} updateBikesAvailable={updateBikesAvailable} />

            <BikeRollerDimensions bikes={bikes} updateBikeConfiguration={updateBikeConfiguration} />

            <div className="form-group">
              <span className="label text-uppercase">
                Racer Roster Options
              </span>
              <Checkbox
                checked={racerAttributes.sex !== undefined}
                onChange={() => {
                  toggleAttribute('sex');
                }}
              >
                Sex
              </Checkbox>
              <Checkbox
                checked={racerAttributes.level !== undefined}
                onChange={() => {
                  toggleAttribute('level');
                }}
              >
                Racer Level
              </Checkbox>
            </div>
          </div>

          {/* Second Column of Settings */}
          <div className="col-xs-4">
            <div className="row">
              <div className="form-group">
                <label htmlFor="select-metric-units" className="text-uppercase">
                  Distance/Speed Units
                </label>
                <div className="input-group">
                  <Select
                    selectProps={{
                      id: 'select-metric-units',
                      style: {
                        width: '190px'
                      },
                      value: defaultRaceSettings.measurementSystem,
                      onChange: (e) => {
                        changeDefaultRaceSetting('measurementSystem', e.target.value);
                      }
                    }}
                  >
                    <option value="imperial">Miles</option>
                    <option value="metric">Kilometers</option>
                  </Select>
                </div>
              </div>
            </div>
            <RaceDistanceSetting
              defaultRaceSettings={defaultRaceSettings}
              changeDefaultRaceSetting={changeDefaultRaceSetting}
            />
            <RaceDurationSetting
              trialDuration={defaultRaceSettings.trialDuration}
              changeDefaultRaceSetting={changeDefaultRaceSetting}
            />
            <TimerDirectionSetting
              timerDirection={defaultRaceSettings.timerDirection}
              changeDefaultRaceSetting={changeDefaultRaceSetting}
            />
          </div>

          {/* Third Column of Settings */}
          <MessageSettings
            messages={messages}
            updateMessageText={updateMessageText}
          />
        </div>
        <hr />
        <RaceScreenSettings />
        <hr />
        <IntermissionScreenSettings />
      </div>
    );
  }
}
