import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';

const undoContainerStyle = {
  backgroundColor: 'white',
  color: '#0079A1',
  position: 'absolute',
  top: '-90px',
  left: '-45px',
  width: '400px',
  height: '90px',
  padding: '35px 25px',
  borderRight: '10px #FCCC06 solid',
  fontSize: '12px'
};

class Undo extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    undo: PropTypes.func.isRequired,
  };

  render() {
    const { show, message, undo } = this.props;
    if (show) {
      return (
        <div className="container">
          <div className="row">
            <div
              className="col-xs-12"
            >
              <div style={undoContainerStyle}>
                <span>{message}</span>
                <span
                  style={{
                    float: 'right',
                    fontWeight: 'bold'
                  }}
                  onClick={() => {
                    undo();
                  }}
                >
                  UNDO
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (<div className="container" />);
  }
}

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
  return bindActionCreators({ ...ActionCreators }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Undo);
