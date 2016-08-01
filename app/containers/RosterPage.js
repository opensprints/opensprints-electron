import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Roster from '../components/Roster';
import * as DefaultSettingsActions from '../actions/defaultSettings';
import * as BikeActions from '../actions/bikes';

function mapStateToProps(state) {
  return {
    defaultSettings: state.defaultSettings,
    bikes: state.bikes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...DefaultSettingsActions, ...BikeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Roster);
