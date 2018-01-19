import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import every from 'lodash/every';
import has from 'lodash/has';
import styles from './Race.css';
import Clock from './Clock';
import RacerStats from './RacerStats';
import MessagesContainer from '../crowd-messaging/messages-container';
import { getTicksToComplete } from '../../selectors';

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

BlueMessage.defaultProps = {
  style: {}
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
        <BlueMessage style={smallerLineupSize}>5. Cheese Ringer</BlueMessage>
        <BlueMessage style={smallerLineupSize}>6. Polite Windtalker</BlueMessage>
        <BlueMessage style={smallerLineupSize}>7. Lex Lame-or</BlueMessage>
        <BlueMessage style={smallerLineupSize}>8. Wunder Woman</BlueMessage>
      </div>
    </div>
  );
};
const initialState = props => ({
  showModal: true,
  countDownText: props.messages.PRE_COUNTDOWN_MESSAGE,
  countDown: 4,
  bikeTicks: new Array(props.race.results.length).fill(0),
  ticksToCompleteByBike: props.bikes.map(bike => getTicksToComplete(props.race, bike))
});

export default class Race extends Component {
  static propTypes = {
    race: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
    messages: PropTypes.object.isRequired,
    startRace: PropTypes.func.isRequired,
    restartRace: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    finishRace: PropTypes.func.isRequired,
    incrementRacer: PropTypes.func.isRequired,
    callRace: PropTypes.func.isRequired,
    finishRacer: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = initialState(props);
  }

  componentDidMount() {
    global.j5$
      .subscribe((x) => {
        const tick2complete = this.state.ticksToCompleteByBike[x];
        if (tick2complete < this.state.bikeTicks[x] + 1) { return; }
        const nextBikeTicks = [...this.state.bikeTicks];
        const next = nextBikeTicks[x] += 1;
        this.setState({ bikeTicks: nextBikeTicks });
        if (tick2complete === next) { this.props.finishRacer(x); }
      });
  }
  componentWillUpdate(nextP) {
    // is the race complete?
    if (every(nextP.race.results, x => has(x, 'place'))) {
      nextP.finishRace(nextP.race);
    }
  }
  componentWillUnmount() {
    if (this.interval) { clearInterval(this.interval); }
  }
  tick() {
    const countDown = this.state.countDown - 1;
    if (countDown === 0) {
      this.props.startRace(this.props.race.id);
      this.setState({ countDown, countDownText: this.props.messages.COUNTDOWN_MESSAGE_GO });
    } else if (countDown === -1) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({ showModal: false });
    } else { this.setState({ countDown, countDownText: this.props.messages[`COUNTDOWN_MESSAGE_${countDown}`] }); }
  }
  goBack() {
    clearInterval(this.interval);
    this.props.restartRace(this.props.race.id);
    this.props.goBack();
  }
  startCountdown() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 1000);
    // this.setState({countDownText = })
  }
  restartRace() {
    this.props.restartRace(this.props.race.id);
    this.setState(initialState(this.props.messages));
  }

  render() {
    const { race, bikes, callRace } = this.props;
    return (
      <div className="container">
        <div className="row">
          <OnDeck />
          <div
            style={{ marginBottom: '6px' }}
            className="col-xs-6"
          >
            <Clock
              startTime={race.startTime}
              race={race}
              bikes={bikes}
              bikeTicks={this.state.bikeTicks}
            />
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
              <button
                className="btn btn-xs btn-default"
                onClick={() => callRace(race)}
              >
                Call It
              </button>
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
              {...this.props}
            />
          ))}
        </div>

        <Modal
          show={this.state.showModal}
          animation={false}
          dialogClassName="countdown-modal"
        >
          <Modal.Body>
            <h1>{this.state.countDownText}</h1>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              onClick={this.goBack.bind(this)}
            >
              Go Back
            </button>
            <button
              className="btn btn-primary"
              onClick={this.startCountdown.bind(this)}
            >
              Start The Countdown!
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
