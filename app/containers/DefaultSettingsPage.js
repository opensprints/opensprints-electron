import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSettings from '../components/default-settings/DefaultSettings';
import * as MessageActions from '../actions/message';
import * as BikeActions from '../actions/bike';
import * as RacerAttributesActions from '../actions/racerAttributes';
import * as DefaultRaceSettingActions from '../actions/defaultRaceSetting';

function mapStateToProps(state) {
  return {
    racerAttributes: state.racerAttributes,
    messages: state.messages,
    bikes: state.bikes,
    defaultRaceSettings: state.defaultRaceSettings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...MessageActions,
    ...BikeActions,
    ...RacerAttributesActions,
    ...DefaultRaceSettingActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings);
