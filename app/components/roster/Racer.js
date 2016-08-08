import React, { Component, PropTypes } from 'react';
import styles from './Racer.css';

export default class RosterRacer extends Component {
  static propTypes = {
    racer: PropTypes.object.isRequired,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  render() {
    const { racer, selected, onClick } = this.props;

    return (
      <li
        className={(`${styles.racer} ${(selected ? styles.selected : '')}`)}
        onClick={onClick}
      >
        {racer.name}
      </li>
    );
  }
}
