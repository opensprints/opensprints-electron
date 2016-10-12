import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DefaultSettings from '../components/default-settings/DefaultSettings';
import * as MessageActions from '../actions/message';
import * as BikeActions from '../actions/bike';

function mapStateToProps(state) {
  return {
    messages: state.messages,
    bikes: state.bikes
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...MessageActions, ...BikeActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DefaultSettings);
