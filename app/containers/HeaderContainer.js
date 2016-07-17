import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import * as NavigationActions from '../actions/navigationVisible';

function mapStateToProps(state) {
  return {
    navigationVisible: state.navigationVisible
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NavigationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
