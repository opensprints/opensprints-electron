import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import styles from './Race.css';
import Clock from './Clock';
import RacerStats from './RacerStats';
import MessagesContainer from '../crowd-messaging/messages-container';

const BlueMessage = ({ style, children }) => (
  <div
    style={style}
    className={styles['blue-message']}
  >
    {children}
  </div>
);
BlueMessage.propTypes = {
  style: PropTypes.object,
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

export default class Race extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    startRace: PropTypes.func.isRequired,
    restartRace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    incrementRacer: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      showModal: true
    };
    johnnyFiveAdapter(props.bikes.map((_, i) => () => props.incrementRacer(props.race.id, i))); // eslint-disable-line

    // TODO setup tick-listeners & pass correct props to clock & indicators
  }

  closeModal() {
    this.props.startRace(this.props.race.id);
    this.setState({ showModal: false });
  }

  restartRace() {
    this.props.restartRace(this.props.race.id);
    this.setState({ showModal: true });
  }

  finishRace() {
    // TODO
  }

  render() {
    const { race, bikes, goBack } = this.props;
    return (
      <div className="container">
        <div className="row">
          <OnDeck />
          <div
            style={{ marginBottom: '6px' }}
            className="col-xs-6"
          >
            <Clock startTime={race.startTime} {...this.props} />
            <div className="col-xs-6">
              <button
                style={{
                  marginTop: '4px',
                  marginBottom: '1px'
                }}
                className="btn btn-xs btn-default pull-right"
                onClick={this.restartRace.bind(this)}
              >
                Start Over
              </button>
            </div>
            <div className="col-xs-6">
              <button className="btn btn-xs btn-default">Call It</button>
            </div>
          </div>
          <MessagesContainer
            style={{
              height: '50vh',
              background: 'none'
            }}
            {...this.props}
          />
        </div>
        <div className="row">
          {bikes.map((_, i) => (
            <RacerStats
              key={`RacerStats-${i}`}
              bikeIndex={i}
              raceId={race.id}
            />
          ))}
        </div>

        <Modal
          show={this.state.showModal}
          onHide={this.closeModal.bind(this)}
          animation={false}
          dialogClassName="countdown-modal"
        >
          <Modal.Body>
            <h1>Racers Ready?</h1>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={() => goBack()}
            >
              Go Back
            </button>
            <button
              className="btn btn-primary"
              onClick={this.closeModal.bind(this)}
            >
              Start The Countdown!
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
