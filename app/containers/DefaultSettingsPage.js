import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSettings from '../components/default-settings/DefaultSettings';
import * as DefaultSettingActions from '../actions/defaultSetting';
import * as BikeActions from '../actions/bike';

function mapStateToProps(state) {
  return {
    defaultSettings: state.defaultSettings,
    bikes: state.bikes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...DefaultSettingActions, ...BikeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings);
