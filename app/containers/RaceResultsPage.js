import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';
import _ from 'lodash';
import * as RaceActions from '../actions/race';
import RaceResults from '../components/race-results';
import * as AudienceMessageActions from '../actions/audienceMessage';

function mapStateToProps(state, ownProps) {
  return {
    audienceMessages: state.audienceMessages,
    race: state.races.find(race => race.id === parseInt(ownProps.match.params.raceId, 10)),
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes,
    nextRace: _(state.races)
      .filter(race => (!race.deleted && !race.finished))
      .head()
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({
      ...AudienceMessageActions
    }, dispatch),
    goToRoster: () => dispatch(push('/roster')),
    goToNextRace: race => dispatch(push(`/race-preview/${race.id}`)),
    onAdHocRaceClick: (bikes) => {
      const newRace = RaceActions.addEmptyRace(bikes);
      dispatch(newRace);
      dispatch(push(`/race-preview/${newRace.race.id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceResults);
