import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Roster from '../components/Roster';
import * as RacerActions from '../actions/racers';

function mapStateToProps(state) {
  return {
    racers: state.racers
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RacerActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
