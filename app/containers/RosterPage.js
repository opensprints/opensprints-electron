import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Roster from '../components/roster';
import * as RaceActions from '../actions/race';
import * as RacerActions from '../actions/racer';

function mapStateToProps(state) {
  return {
    bikes: state.bikes,
    racers: state.racers.present,
    races: state.races,
    racerAttributes: state.racerAttributes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ ...RaceActions, ...RacerActions, push }, dispatch),
    startSpecificRace: (firstRaceId, raceId) => {
      if (firstRaceId !== raceId) {
        dispatch(RaceActions.changeRaceOrder(firstRaceId, raceId));
      }
      dispatch(push(`/race-preview/${raceId}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
