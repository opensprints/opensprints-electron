import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PlainContext from './PlainContext';

const appendZero = (val) => (val < 10 ? `0${val}` : val);

export default class RaceDurationSetting extends Component {
  static propTypes = {
    trialDuration: PropTypes.object.isRequired,
    changeDefaultRaceSetting: PropTypes.func.isRequired
  }

  render() {
    const { trialDuration, changeDefaultRaceSetting } = this.props;
    return (
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
                  type="number"
                  value={appendZero(trialDuration.hours())}
                  max="23"
                  min="0"
                  onChange={(e) => {
                    changeDefaultRaceSetting('trialDuration',
                      moment.duration(
                        (trialDuration.asSeconds() % 3600) +
                        (parseInt(e.target.value.replace(/[^\d]/g, ''), 10) * 3600),
                        'seconds'
                      )
                    );
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
                  type="number"
                  max="59"
                  min="0"
                  value={appendZero(trialDuration.minutes())}
                  onChange={(e) => {
                    changeDefaultRaceSetting('trialDuration',
                      moment.duration(
                        (trialDuration.hours() * 3600) +
                        (parseInt(e.target.value.replace(/[^\d]/g, ''), 10) * 60) +
                        trialDuration.seconds(),
                        'seconds'
                      )
                    );
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
                  type="number"
                  max="59"
                  min="0"
                  value={appendZero(trialDuration.seconds())}
                  onChange={(e) => {
                    changeDefaultRaceSetting('trialDuration',
                      moment.duration(
                        (trialDuration.asSeconds() - (trialDuration.asSeconds() % 60)) +
                        parseInt(e.target.value.replace(/[^\d]/g, ''), 10),
                        'seconds'
                      )
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
