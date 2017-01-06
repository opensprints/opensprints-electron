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
      <div className={styles.contextBorder} />
      <span className={styles.contextContent}>
        {children}
      </span>
    </div>
  </div>
);
BikeContext.propTypes = {
  children: PropTypes.number
};

const PlainContext = ({ children }) => (
  <div className={styles.contextContainer}>
    <div style={{ position: 'relative' }}>
      <span className={styles.contextContent}>
        {children}
      </span>
    </div>
  </div>
);
PlainContext.propTypes = {
  children: PropTypes.string
};

const RaceDistanceSetting = () => (
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
              defaultValue="100"
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
          <StandardSelect
            selectProps={{
              style: {
                width: '130px'
              },
              onChange: () => {
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
);

const RaceDurationSetting = () => (
  <div className="row">
    <div className="input-group inline">
      <span className="label group-heading text-uppercase">
        Trial Duration
      </span>
      <div className="input-group inline">
        <div
          className="col-xs-3"
          style={{
            padding: '3px 3px 3px 0'
          }}
        >
          <div style={{ position: 'relative' }}>
            <PlainContext>H</PlainContext>
            <input
              style={{
                padding: '6px 20px'
              }}
              className="form-control context"
              type="text"
              defaultValue="00"
              onChange={() => {
                // TODO add validation for input values
              }}
            />
          </div>
        </div>
        <div
          className="col-xs-3"
          style={{
            padding: '3px'
          }}
        >
          <div style={{ position: 'relative' }}>
            <PlainContext>M</PlainContext>
            <input
              style={{
                padding: '6px 20px'
              }}
              className="form-control context"
              type="text"
              defaultValue="00"
              onChange={() => {
                // TODO add validation for input values
              }}
            />
          </div>
        </div>
        <div
          className="col-xs-3"
          style={{
            padding: '3px'
          }}
        >
          <div style={{ position: 'relative' }}>
            <PlainContext>S</PlainContext>
            <input
              style={{
                padding: '6px 20px'
              }}
              className="form-control context"
              type="text"
              defaultValue="00"
              onChange={() => {
                // TODO add validation for input values
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RaceScreenSettings = () => (
  <div className="row">
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Race Screen Background
        </span>
        <Background />
      </div>
    </div>
    <div className="col-xs-6">
      <div className="form-group">
        <span className="label text-uppercase">
          Race Clock Background
        </span>
        <Background />
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
        <Background />
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
            defaultValue="We'd like to thank Wal-Mart and the Koch Brothers."
          />
        </div>
      </div>
    </div>
  </div>
);

export default class DefaultSettings extends Component {
  static propTypes = {
    bikes: PropTypes.array.isRequired,
    messages: PropTypes.object,
    updateBikesAvailable: PropTypes.func.isRequired,
    updateBikeConfiguration: PropTypes.func.isRequired,
    updateMessageText: PropTypes.func.isRequired,
    racerAttributes: PropTypes.object.isRequired,
    toggleAttribute: PropTypes.func.isRequired,
    changeDefaultRaceSetting: PropTypes.func.isRequired,
    defaultRaceSettings: PropTypes.object.isRequired
  }
  render() {
    const {
      bikes,
      updateBikesAvailable,
      updateBikeConfiguration,
      updateMessageText,
      racerAttributes,
      toggleAttribute,
      changeDefaultRaceSetting,
      defaultRaceSettings
    } = this.props;

    const onTimerDirectionChanged = (e) => {
      changeDefaultRaceSetting('timerDirection', e.target.value);
    };

    const {
      PRE_COUNTDOWN_MESSAGE,
      COUNTDOWN_MESSAGE_3,
      COUNTDOWN_MESSAGE_2,
      COUNTDOWN_MESSAGE_1,
      COUNTDOWN_MESSAGE_GO,
      WINNER_MESSAGE,
      FALSE_START_MESSAGE
    } = this.props.messages;

    const handleMessageChange = (key) => (e) => {
      updateMessageText(key, e.target.value);
    };

    return (
      <div className="container">
        <h2>Default Settings</h2>

        {/* First Horizontal Row of Settings */}
        <div className="row">

          {/* First Column of Settings */}
          <div className="col-xs-4">
            <div className="form-group">
              <label htmlFor="select-bikes" className="text-uppercase">
                Number of Bikes
              </label>
              <div>
                <StandardSelect
                  selectProps={{
                    id: 'select-bikes',
                    style: {
                      width: '90px'
                    },
                    onChange: (e) => { updateBikesAvailable(parseInt(e.target.value, 10)); },
                    value: bikes.length
                  }}
                >
                  {[2, 4].map((num) => (
                    <option key={`bikeNum-option-${num}`} value={num}>{num}</option>
                  ))}
                </StandardSelect>
              </div>
            </div>
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
              <span className="label text-uppercase">
                Racer Colors
              </span>
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
                  <StandardSelect
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
                  </StandardSelect>
                </div>
              </div>
            </div>
            <RaceDistanceSetting />
            <RaceDurationSetting />
            <div className="row">
              <label className="radio-inline">
                <input
                  type="radio"
                  name="durationCountDirection"
                  id="durationCountDown"
                  checked={defaultRaceSettings.timerDirection === 'down'}
                  value="down"
                  onChange={onTimerDirectionChanged}
                />
                Count Down
              </label>
              <label className="radio-inline">
                <input
                  type="radio"
                  name="durationCountDirection"
                  id="durationCountUp"
                  checked={defaultRaceSettings.timerDirection === 'up'}
                  value="up"
                  onChange={onTimerDirectionChanged}
                />
                Count Up
              </label>
            </div>
          </div>

          {/* Third Column of Settings */}
          <div className="col-xs-4">
            <div className="row">
              <div className="form-group">
                <label
                  className="control-label text-uppercase"
                  htmlFor="preCountdownMsgInput"
                >
                  Pre Countdown Message
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="preCountdownMsgInput"
                  value={PRE_COUNTDOWN_MESSAGE}
                  onChange={handleMessageChange('PRE_COUNTDOWN_MESSAGE')}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <span
                  className="control-label text-uppercase"
                  style={{
                    display: 'inline-block',
                    maxWidth: '100%',
                    marginBottom: '5px',
                    fontWeight: 'bold'
                  }}
                >
                  Countdown Messages
                </span>
                <div style={{ position: 'relative' }}>
                  <PlainContext>3</PlainContext>
                  <input
                    style={{
                      padding: '6px 30px'
                    }}
                    className="form-control context"
                    type="text"
                    value={COUNTDOWN_MESSAGE_3}
                    onChange={handleMessageChange('COUNTDOWN_MESSAGE_3')}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <PlainContext>2</PlainContext>
                  <input
                    style={{
                      padding: '6px 30px'
                    }}
                    className="form-control context"
                    type="text"
                    value={COUNTDOWN_MESSAGE_2}
                    onChange={handleMessageChange('COUNTDOWN_MESSAGE_2')}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <PlainContext>1</PlainContext>
                  <input
                    style={{
                      padding: '6px 30px'
                    }}
                    className="form-control context"
                    type="text"
                    value={COUNTDOWN_MESSAGE_1}
                    onChange={handleMessageChange('COUNTDOWN_MESSAGE_1')}
                  />
                </div>
                <div style={{ position: 'relative' }}>
                  <PlainContext>GO</PlainContext>
                  <input
                    style={{
                      padding: '6px 30px'
                    }}
                    className="form-control context"
                    type="text"
                    value={COUNTDOWN_MESSAGE_GO}
                    onChange={handleMessageChange('COUNTDOWN_MESSAGE_GO')}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label
                  className="control-label text-uppercase"
                  htmlFor="winnerMsgInput"
                >
                  Winner Message
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="winnerMsgInput"
                  value={WINNER_MESSAGE}
                  onChange={handleMessageChange('WINNER_MESSAGE')}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group">
                <label
                  className="control-label text-uppercase"
                  htmlFor="falseStartMsgInput"
                >
                  False Start Message
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="falseStartMsgInput"
                  value={FALSE_START_MESSAGE}
                  onChange={handleMessageChange('FALSE_START_MESSAGE')}
                />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <RaceScreenSettings />
        <hr />
        <IntermissionScreenSettings />
      </div>
    );
  }
}
