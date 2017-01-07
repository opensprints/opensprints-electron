import React, { Component, PropTypes } from 'react';
import styles from './settings.css';

export default class PlainContext extends Component {
  static propTypes = {
    children: PropTypes.string
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.contextContainer}>
        <div style={{ position: 'relative' }}>
          <span className={styles.contextContent}>
            {children}
          </span>
        </div>
      </div>
    );
  }
}