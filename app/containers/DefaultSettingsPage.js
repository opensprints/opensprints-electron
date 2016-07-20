import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSettings from '../components/DefaultSettings';
import * as DefaultSettingsActions from '../actions/defaultSettings';

function mapStateToProps(state) {
  return {
    defaultSettings: state.defaultSettings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DefaultSettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings);
