import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './messages.css';

/**
 * I'm Blue da ba dee da ba daa...
 */
const BlueMessage = ({ swag, children }) => (
  <div
    style={swag}
    className={styles['blue-message']}
  >
    {children}
  </div>
);
BlueMessage.propTypes = {
  swag: PropTypes.object,
  children: PropTypes.node.isRequired
};

class MessagesContainer extends Component {
  static propTypes = { };

  render() {
    return (
      <div
        className="col-xs-offset-9 col-xs-3"
        style={{
          height: '650px',
          backgroundColor: 'rgba(0,0,0,0.6)'
        }}
      >
        <div className="pull-right">
          <span className={styles['add-message']}>
            Add Message
          </span>
          <i className="material-icons md-24">add_circle</i>
        </div>
        <div
          style={{
            clear: 'right',
            marginTop: '20px'
          }}
          className="pull-right"
        >
          <span
            style={{
              textTransform: 'uppercase',
              display: 'inline-block',
              maxWidth: '100%',
              marginBottom: '5px',
              fontWeight: 'bold'
            }}
          >
            Last Call
          </span>
        </div>
        <hr
          style={{
            margin: 0,
            clear: 'both'
          }}
        />
        <div style={{ float: 'right' }}>
          <BlueMessage swag={{ textAlign: 'right' }}>
            head up 2 the bar 4 last drinks
          </BlueMessage>
        </div>
      </div>
    );
  }
}

export default MessagesContainer;
