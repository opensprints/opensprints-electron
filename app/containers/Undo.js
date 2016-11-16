import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import * as UndoActions from '../actions/showUndo';
import Undo from '../components/undo';

let setupProps = true;
function mapStateToProps(state) {
  if (state.showUndo && setupProps) {
    setupProps = false;
    const prevLength = state.racers.past[state.racers.past.length - 1].length;
    const curLength = state.racers.present.length;
    if (prevLength > curLength) {
      return {
        show: state.showUndo,
        message: `${prevLength - curLength} Racers have been deleted successfully.`
      };
    }
    return {
      show: state.showUndo,
      message: `${state.racers.present[curLength - 1].name} has been added successfully.`
    };
  }
  setupProps = true;
  return {
    show: state.showUndo,
    message: ''
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...ActionCreators, ...UndoActions }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Undo);
