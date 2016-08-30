import React, { Component, PropTypes } from 'react';
import styles from './RacerSelect.css';

export default class RacerEdit extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    bike: PropTypes.object.isRequired,
    racer: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  render() {
    const { bikeIndex, bike, racer } = this.props;
    const { editing } = this.state;

    return (
      <div className={`${styles['racer-select']} col-xs-3`}>
        <div
          className={styles['bike-indicator']}
          style={{ backgroundColor: bike.color }}
        >
          {bikeIndex + 1}
        </div>
        <div className={styles['racer-select-container']}>
          {!editing ? <label className={styles.name}>{racer.name}</label> :
            <div>
              <form>
                <div className="form-group">
                  <div className="input-group">
                    <input
                      className="form-control input"
                      type="text"
                      defaultValue={racer.name}
                    />
                    <span className="form-control-feedback">
                      <i className="material-icons md-24" style={{ color: '#4F4F4F' }}>add_box</i>
                    </span>
                  </div>
                </div>
                <select className="form-control">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <br />
                <select className="form-control">
                  <option>Filthy Casual</option>
                  <option>I ride bikes, m'kay</option>
                  <option>Which way is the gym, Bro?</option>
                </select>
              </form>
              <button
                type="button"
                className="btn btn-default btn-xs"
                onClick={() => {
                  this.setState({ editing: false });
                }}
              >
                Cancel
              </button>
              <button type="button" className="btn btn-default btn-xs">Save</button>
            </div>
          }
        </div>
        {!editing ? <div className="row">
          <div className="col-xs-6">
            <button
              className="btn btn-default btn-xs"
              onClick={() => {
                this.setState({ editing: true });
              }}
            >
              change
            </button>
          </div>
          <i className="col-xs-offset-2 col-xs-2 material-icons md-24">delete</i>
        </div> : ''}
      </div>
    );
  }
}
