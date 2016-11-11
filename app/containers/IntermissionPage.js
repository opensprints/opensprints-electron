// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Intermission from '../components/Intermission';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races
  };
}

export default connect(mapStateToProps)(Intermission);
