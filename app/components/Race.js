import React, { Component, PropTypes } from 'react';
import styles from './Race.css';
import racerStyles from './race-preview/RacerSelect.css';

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

const BasicHR = () => (
  <hr
    style={{
      margin: 0,
      clear: 'both'
    }}
  />
);

const RacerStats = ({ bikeIndex, bike, racer }) => (
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
      <label className={racerStyles.name}>
        {racer.name}
      </label>
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
RacerStats.propTypes = {
  bikeIndex: PropTypes.number.isRequired,
  bike: PropTypes.object.isRequired,
  racer: PropTypes.object.isRequired
};

const Clock = () => (
  <div className={styles['clock-frame']}>
    <div className={styles['clock-face']}>
      <div className={`${styles.poleContainer} ${styles.northContainer}`}>
        <span>100</span>
      </div>
      <div className={`${styles.poleGuideline} ${styles.northGuideline}`} />

      <div className={`${styles.tropicContainer} ${styles.eastContainer}`}>
        <span>25</span>
      </div>
      <div className={`${styles.tropicGuideline} ${styles.eastGuideline}`} />

      <div className={`${styles.poleContainer} ${styles.southContainer}`}>
        <span>50</span>
      </div>
      <div className={`${styles.poleGuideline} ${styles.southGuideline}`} />

      <div className={`${styles.tropicContainer} ${styles.westContainer}`}>
        <span>75</span>
      </div>
      <div className={`${styles.tropicGuideline} ${styles.westGuideline}`} />

      <div className={styles['clock-center']} />
    </div>
    <div className={styles.stopwatch}>
      00:00.2
    </div>
  </div>
);

export default class Race extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeRace: props.races.find((race) => race.id === parseInt(props.params.race, 10))
    };
  }
  render() {
    const { bikes } = this.props;
    const racers = [
      { id: 0, name: 'Speed Racer' },
      { id: 1, name: 'Racer X' },
      { id: 2, name: 'Chim Chim' },
      { id: 3, name: 'Snake Oiler' }
    ];
    const messageGroupStyle = {
      marginTop: '5px',
      marginBottom: '20px'
    };
    const smallerLineupSize = { fontSize: '16px' };
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-3">
            <label style={{ fontSize: '14px' }}>
              ON DECK
            </label>
            <BasicHR />
            <div style={messageGroupStyle}>
              <BlueMessage>1. Monk Dude</BlueMessage>
              <BlueMessage>2. Nick Stew</BlueMessage>
              <BlueMessage>3. Yanni Boy</BlueMessage>
              <BlueMessage>4. Clark Kent</BlueMessage>
            </div>
            <div style={messageGroupStyle}>
              <BlueMessage swag={smallerLineupSize}>5. Cheese Ringer</BlueMessage>
              <BlueMessage swag={smallerLineupSize}>6. Polite Windtalker</BlueMessage>
              <BlueMessage swag={smallerLineupSize}>7. Lex Lame-or</BlueMessage>
              <BlueMessage swag={smallerLineupSize}>8. Wunder Woman</BlueMessage>
            </div>
          </div>
          <div
            style={{ marginBottom: '6px' }}
            className="col-xs-6"
          >
            <Clock />
            <div className="col-xs-6">
              <button
                style={{
                  marginTop: '4px',
                  marginBottom: '1px'
                }}
                className="btn btn-xs btn-default pull-right"
              >
                Start Over
              </button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-xs btn-default">Call It</button>
            </div>
          </div>
          <div className="col-xs-3">
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
              <label>Last Call</label>
            </div>
            <BasicHR />
            <div style={{ float: 'right' }}>
              <BlueMessage swag={{ textAlign: 'right' }}>
                head up 2 the bar 4 last drinks
              </BlueMessage>
            </div>
          </div>
        </div>
        <div className="row">
          {racers.map((racer, i) => (
            <RacerStats
              key={i}
              bikeIndex={i}
              bike={bikes[i]}
              racer={racer}
            />
          ))}
        </div>
      </div>
    );
  }
}
