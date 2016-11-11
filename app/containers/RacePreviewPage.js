// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import RacePreview from '../components/race-preview/RacePreview';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes
  };
}

export default connect(mapStateToProps, undefined)(withRouter(RacePreview));
