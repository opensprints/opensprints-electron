import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OnDeckRace from './OnDeckRace';

export default class OnDeckContainer extends Component {
  static propTypes = {
    currentRace: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    limit: PropTypes.number
  };

  static defaultProps = {
    limit: -1
  };

  render() {
    const { currentRace, races, racers, limit } = this.props;

    const nextRaces = races.filter(race => (
      !race.deleted && !race.finished && currentRace.id !== race.id
    ));
    const end = limit !== -1 && limit < nextRaces.length ? limit : nextRaces.length;
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
        {nextRaces.length > 0 ? nextRaces.slice(0, end).map((race, i) => (
          <OnDeckRace
            queuePosition={i + 1}
            race={race}
            racers={racers}
            style={messageGroupStyle}
            childStyle={i > 0 ? smallerLineupSize : undefined}
          />
        )) : ''}
      </div>
    );
  }
}
