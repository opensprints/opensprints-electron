import React, { Component } from 'react';
import MessagesContainer from '../crowd-messaging/messages-container';

export default class Intermission extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <MessagesContainer {...this.props} />
        </div>
      </div>
    );
  }
}
