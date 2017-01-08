import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import RacePreview from '../components/race-preview/RacePreview';
import * as RaceActions from '../actions/race';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes,
    defaultRaceSettings: state.defaultRaceSettings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...RaceActions, push }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RacePreview));
