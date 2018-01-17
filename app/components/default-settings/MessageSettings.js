import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlainContext from './PlainContext';

export default class MessageSettings extends Component {
  static propTypes = {
    messages: PropTypes.object.isRequired,
    updateMessageText: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }

  handleMessageChange(key) {
    return (e) => {
      this.props.updateMessageText(key, e.target.value);
    };
  }

  render() {
    const {
      PRE_COUNTDOWN_MESSAGE,
      COUNTDOWN_MESSAGE_3,
      COUNTDOWN_MESSAGE_2,
      COUNTDOWN_MESSAGE_1,
      COUNTDOWN_MESSAGE_GO,
      WINNER_MESSAGE,
      FALSE_START_MESSAGE
    } = this.props.messages;

    return (
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
              onChange={this.handleMessageChange('PRE_COUNTDOWN_MESSAGE')}
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
                onChange={this.handleMessageChange('COUNTDOWN_MESSAGE_3')}
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
                onChange={this.handleMessageChange('COUNTDOWN_MESSAGE_2')}
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
                onChange={this.handleMessageChange('COUNTDOWN_MESSAGE_1')}
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
                onChange={this.handleMessageChange('COUNTDOWN_MESSAGE_GO')}
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
              onChange={this.handleMessageChange('WINNER_MESSAGE')}
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
              onChange={this.handleMessageChange('FALSE_START_MESSAGE')}
            />
          </div>
        </div>
      </div>
    );
  }
}
