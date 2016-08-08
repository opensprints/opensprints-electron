import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Roster from '../components/roster';
import * as RaceActions from '../actions/races';
import * as RacerActions from '../actions/racers';

function mapStateToProps(state) {
  return {
    racers: state.racers,
    races: state.races
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...RaceActions, ...RacerActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
