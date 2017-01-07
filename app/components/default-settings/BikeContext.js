import React, { Component, PropTypes } from 'react';
import styles from './settings.css';

export default class BikeContext extends Component {
  static propTypes = {
    children: PropTypes.number
  }

  render() {
    const { children } = this.props;
    return (
      <div className={styles.contextContainer}>
        <div style={{ position: 'relative' }}>
          <div className={styles.contextBorder} />
          <span className={styles.contextContent}>
            {children}
          </span>
        </div>
      </div>
    );
  }
}
