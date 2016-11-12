import React, { Component, PropTypes } from 'react';

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

export default class Undo extends Component {
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
                    fontWeight: 'bold',
                    cursor: 'pointer'
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
