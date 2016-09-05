// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Race from '../components/Race';

function mapStateToProps(state) {
  return {
    racers: state.racers,
    races: state.races,
    bikes: state.bikes
  };
}

export default connect(mapStateToProps, undefined)(withRouter(Race));
