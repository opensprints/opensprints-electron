import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import * as RaceActions from '../actions/race';
import * as AudienceMessageActions from '../actions/audienceMessage';
import Race from '../components/race/Race';

function mapStateToProps(state, ownProps) {
  return {
    race: state.races.find(race => race.id === parseInt(ownProps.match.params.raceId, 10)),
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes,
    audienceMessages: state.audienceMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...AudienceMessageActions,
    ...RaceActions,
    goBack
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Race);
