import React, { Component, PropTypes } from 'react';
import styles from './Race.css';
import Clock from './Clock';
import RacerStats from './RacerStats';

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

const OnDeck = () => {
  const messageGroupStyle = {
    marginTop: '5px',
    marginBottom: '20px'
  };
  const smallerLineupSize = { fontSize: '16px' };
  return (
    <div className="col-xs-3">
      <span
        style={{
          textTransform: 'uppercase',
          display: 'inline-block',
          maxWidth: '100%',
          marginBottom: '5px',
          fontWeight: 'bold'
        }}
      >
        On Deck
      </span>
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
  );
};

const MessageQueue = () => (
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
    <BasicHR />
    <div style={{ float: 'right' }}>
      <BlueMessage swag={{ textAlign: 'right' }}>
        head up 2 the bar 4 last drinks
      </BlueMessage>
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
    return (
      <div className="container">
        <div className="row">
          <OnDeck />
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
          <MessageQueue />
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
