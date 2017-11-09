import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Intermission from '../components/intermission';
import * as AudienceMessageActions from '../actions/audienceMessage';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
    audienceMessages: state.audienceMessages
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...AudienceMessageActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Intermission);
