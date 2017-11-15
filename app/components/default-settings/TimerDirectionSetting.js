import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TimerDirectionSetting extends Component {
  static propTypes = {
    timerDirection: PropTypes.string.isRequired,
    changeDefaultRaceSetting: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.onTimerDirectionChanged = this.onTimerDirectionChanged.bind(this);
  }

  onTimerDirectionChanged(e) {
    this.props.changeDefaultRaceSetting('timerDirection', e.target.value);
  }

  render() {
    const { timerDirection } = this.props;
    return (
      <div className="row">
        <label className="radio-inline">
          <input
            type="radio"
            name="durationCountDirection"
            id="durationCountDown"
            checked={timerDirection === 'down'}
            value="down"
            onChange={this.onTimerDirectionChanged}
          />
          Count Down
        </label>
        <label className="radio-inline">
          <input
            type="radio"
            name="durationCountDirection"
            id="durationCountUp"
            checked={timerDirection === 'up'}
            value="up"
            onChange={this.onTimerDirectionChanged}
          />
          Count Up
        </label>
      </div>
    );
  }
}
