import React, { Component, PropTypes } from 'react';
import style from './Undo.css';

let timeout;

export default class Undo extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired,
    undo: PropTypes.func.isRequired,
    hideUndo: PropTypes.func.isRequired
  };

  setupTimeout() {
    const { show, hideUndo } = this.props;
    if (show) {
      timeout = setTimeout(() => {
        hideUndo();
      }, 5000);
    }
  }

  render() {
    const { show, message, undo } = this.props;
    if (show) {
      if (!timeout) {
        this.setupTimeout();
      }
      return (
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className={style.container}>
                <span className={style.message}>{message}</span>
                <span
                  className={style.button}
                  onClick={() => {
                    clearTimeout(timeout);
                    timeout = undefined;
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
