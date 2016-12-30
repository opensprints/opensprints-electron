// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RaceResults from '../components/race-results';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes
  };
}

export default connect(mapStateToProps)(withRouter(RaceResults));
