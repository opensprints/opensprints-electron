import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OnDeckRace from './OnDeckRace';

export default class OnDeckContainer extends Component {
  static propTypes = {
    currentRace: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired
  };

  render() {
    const { currentRace, races, racers } = this.props;
    const nextRaces = races.filter(race => (
      !race.deleted && !race.finished && currentRace.id !== race.id
    ));
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
        <hr
          style={{
            margin: 0,
            clear: 'both'
          }}
        />
        {nextRaces.length > 0 ? (
          <OnDeckRace
            queuePosition={1}
            race={nextRaces[0]}
            racers={racers}
            style={messageGroupStyle}
          />
        ) : ''}
        {nextRaces.length > 1 ? (
          <OnDeckRace
            queuePosition={2}
            race={nextRaces[1]}
            racers={racers}
            style={messageGroupStyle}
            childStyle={smallerLineupSize}
          />
      ) : ''}
      </div>
    );
  }
}
