import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Racer.css';

export default class RosterRacer extends Component {
  static propTypes = {
    racer: PropTypes.object.isRequired,
    racerAttributes: PropTypes.object,
    selected: PropTypes.bool,
    onClick: PropTypes.func
  };

  abrValue(key, value) {
    if (value) {
      switch (key.toLowerCase()) {
        case 'sex':
          return value[0];
        case 'level':
          return value.slice(0, 3);
        default:
          return value;
      }
    }
    return value;
  }

  render() {
    const { racer, racerAttributes, selected, onClick } = this.props;

    return (
      <tr
        className={(`${styles.racer} ${(selected ? styles.selected : '')}`)}
        onClick={onClick}
      >
        <td className={styles.columnCell}>
          <i className="material-icons">
            {selected ? 'check_box' : 'check_box_outline_blank'}
          </i>
        </td>
        <td className={styles.columnCell}>
          {racer.name}
        </td>
        {Object.keys(racerAttributes).map((key) => (
          <td
            key={`racer-${racer.id}-${key}`}
            className={styles.columnCell}
          >
            {this.abrValue(key, racer[key])}
          </td>
        ))}
        <td className={styles.columnCell}>
          {racer.time}
        </td>
      </tr>
    );
  }
}
