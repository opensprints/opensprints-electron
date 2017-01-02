import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as RaceActions from '../actions/race';
import Race from '../components/race/Race';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...RaceActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Race));
