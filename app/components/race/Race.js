import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import every from 'lodash/every';
import has from 'lodash/has';
import Clock from './Clock';
import RacerStats from './RacerStats';
import MessagesContainer from '../crowd-messaging/messages-container';
import OnDeckContainer from '../on-deck/OnDeckContainer';
import { getTicksToComplete } from '../../selectors';
import RacerDisplayStyle from '../race-results/RacerDisplay.css';
import ModalStyle from './Modal.css';

const initialState = props => ({
  showModal: true,
  countDownText: props.messages.PRE_COUNTDOWN_MESSAGE,
  countDown: 4,
  bikeTicks: new Array(props.race.results.length).fill(0),
  falseStartBikes: new Array(props.race.results.length).fill(0),
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
    callRace: PropTypes.func.isRequired,
    finishRacer: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = initialState(props);
  }

  componentDidMount() {
    // eslint-disable-next-line react/no-did-mount-set-state
    this.setState({
      subscriber: global.j5$
        .subscribe((x) => {
          if (!this.props.race.startTime) {
            this.falseStart(x);
            return;
          }
          const tick2complete = this.state.ticksToCompleteByBike[x];
          if (tick2complete < this.state.bikeTicks[x] + 1) {
            return;
          }
          const nextBikeTicks = [...this.state.bikeTicks];
          const next = nextBikeTicks[x] += 1;
          this.setState({ bikeTicks: nextBikeTicks });
          if (tick2complete === next) {
            this.props.finishRacer(x, next);
          }
        })
    });
  }

  componentWillUpdate(nextP) {
    // is the race complete?
    if (every(nextP.race.results, x => has(x, 'place'))) {
      nextP.finishRace(nextP.race, this.state.bikeTicks);
    }
  }

  componentWillUnmount() {
    if (this.interval) { clearInterval(this.interval); }
    this.state.subscriber.unsubscribe();
  }

  falseStart(bikeIndex) {
    const { falseStartBikes } = this.state;
    falseStartBikes[bikeIndex] = 1;
    if (this.state.countDown === 4) {
      this.setState({
        falseStartBikes
      });
      setTimeout(this.resetFalseStartBike.bind(this, bikeIndex), 100);
      return;
    }
    this.setState({
      showModal: true,
      countDownText: this.props.messages.FALSE_START_MESSAGE,
      falseStartBikes
    });
    clearInterval(this.interval);
    this.interval = null;
  }

  resetFalseStartBike(bikeIndex) {
    const { falseStartBikes } = this.state;
    falseStartBikes[bikeIndex] = 0;
    this.setState({ falseStartBikes });
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
  }

  restartRace() {
    this.props.restartRace(this.props.race.id);
    this.setState(initialState(this.props));
  }

  render() {
    const { race, races, racers, bikes, callRace, messages } = this.props;
    const { bikeTicks, countDown, countDownText, falseStartBikes } = this.state;
    return (
      <div className="container">
        <div className="row">
          <OnDeckContainer limit={4} currentRace={race} races={races} racers={racers} />
          <div
            style={{ marginBottom: '6px' }}
            className="col-xs-6"
          >
            <Clock
              startTime={race.startTime}
              race={race}
              bikes={bikes}
              bikeTicks={bikeTicks}
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
                onClick={() => callRace(race, bikeTicks)}
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
              bikeTicks={bikeTicks}
              raceId={race.id}
              className={bikes.length < 4 && i === 0 ? 'col-xs-offset-3' : ''}
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
            <div
              className="row"
              style={{
                marginTop: '40px',
                marginBottom: '40px',
                display: countDownText === messages.PRE_COUNTDOWN_MESSAGE ? 'none' : undefined
              }}
            >
              <div className="col-xs-offset-2 col-xs-2">
                <div className={`${ModalStyle['countdown-light']} ${ModalStyle['red-light']}`} />
              </div>
              <div className="col-xs-2">
                <div
                  className={`${ModalStyle['countdown-light']} ${
                    countDown < 3 ? ModalStyle['yellow-light-lit'] : ModalStyle['yellow-light']
                  }`}
                />
              </div>
              <div className="col-xs-2">
                <div
                  className={`${ModalStyle['countdown-light']} ${
                    countDown < 2 ? ModalStyle['yellow-light-lit'] : ModalStyle['yellow-light']
                  }`}
                />
              </div>
              <div className="col-xs-2">
                <div
                  className={`${ModalStyle['countdown-light']} ${
                    countDown < 1 ? ModalStyle['green-light-lit'] : ModalStyle['green-light']
                  }`}
                />
              </div>
            </div>
            <h1>{this.state.countDownText}</h1>
            <div
              className="row"
              style={{
                display: (countDownText === messages.PRE_COUNTDOWN_MESSAGE ||
                  countDownText === messages.FALSE_START_MESSAGE) ? undefined : 'none'
              }}
            >
              {bikes.map((bike, i) => (
                <div
                  key={`bike-indicator-${i}`}
                  className={`col-xs-3 ${bikes.length < 4 && i === 0 ? 'col-xs-offset-3' : ''}`}
                >
                  <div
                    className={RacerDisplayStyle.indicator}
                    style={{
                      position: 'relative',
                      right: 0,
                      top: 0,
                      backgroundColor: bike.color,
                      filter: `brightness(${falseStartBikes[i] === 1 ? 1 : 0.5})`
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="btn btn-default"
              style={{
                display: (countDownText === messages.PRE_COUNTDOWN_MESSAGE ||
                  countDownText === messages.FALSE_START_MESSAGE) ? undefined : 'none'
              }}
              onClick={this.goBack.bind(this)}
            >
              Go Back to Setup
            </button>
            <button
              className="btn btn-primary"
              style={{
                display: `${countDownText === messages.FALSE_START_MESSAGE ? undefined : 'none'}`
              }}
              onClick={this.restartRace.bind(this)}
            >
              Restart Race
            </button>
            <button
              className="btn btn-primary"
              style={{
                display: `${countDownText === messages.PRE_COUNTDOWN_MESSAGE ? undefined : 'none'}`
              }}
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
