import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './settings.css';

export default class BikeContext extends Component {
  static propTypes = {
    children: PropTypes.number.isRequired
  };

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
