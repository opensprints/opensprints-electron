import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Roster from '../components/roster';
import * as RaceActions from '../actions/race';
import * as RacerActions from '../actions/racer';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    racerAttributes: state.racerAttributes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...RaceActions, ...RacerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
