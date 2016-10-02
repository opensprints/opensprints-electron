import React, { Component, PropTypes } from 'react';
import racerStyles from '../race-preview/RacerSelect.css';

export default class RacerStats extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    bike: PropTypes.object.isRequired,
    racer: PropTypes.object.isRequired
  }

  render() {
    const { bikeIndex, bike, racer } = this.props;
    return (
      <div className={`col-xs-3 ${racerStyles['racer-select']}`}>
        <div
          className={racerStyles['bike-indicator']}
          style={{ backgroundColor: bike.color }}
        >
          {bikeIndex + 1}
        </div>
        <div
          style={{ marginBottom: '5px' }}
          className={racerStyles['racer-edit-container']}
        >
          <span className={racerStyles.name}>
            {racer.name}
          </span>
          <div>
            00.0 m
            <div
              style={{
                marginRight: '20px',
                fontWeight: 'bold'
              }}
              className="pull-right"
            >
              00.0 km/hr
            </div>
          </div>
        </div>
        <div
          style={{ paddingLeft: '8px' }}
        >
          <span
            style={{
              fontWeight: 'bold',
              marginRight: '10px'
            }}
          >
            FIN
          </span>
          00:00:00.0
        </div>
      </div>
    );
  }
}
