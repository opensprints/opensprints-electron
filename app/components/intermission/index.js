import React, { Component, PropTypes } from 'react';
import MessagesContainer from '../crowd-messaging/messages-container';

export default class Intermission extends Component {
  static propTypes = {
    racers: PropTypes.array,
    races: PropTypes.array
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <MessagesContainer />
        </div>
      </div>
    );
  }
}
