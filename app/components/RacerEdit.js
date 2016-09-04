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
                      className={`form-control input ${styles['name-edit']}`}
                      type="text"
                      defaultValue={racer.name}
                    />
                    <span className="form-control-feedback">
                      <i
                        className={`material-icons md-24
                          ${(true ? '' : styles['add-new-user-disabled'])}`}
                      >
                        add_box
                      </i>
                    </span>
                  </div>
                </div>
                <div className="select-container">
                  <select className="form-control">
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <span className="form-control-feedback">
                    <i className="material-icons md-36">arrow_drop_down</i>
                  </span>
                </div>
                <br />
                <div className="select-container">
                  <select className="form-control">
                    <option>Filthy Casual</option>
                    <option>I ride bikes, m'kay</option>
                    <option>It's not about the bike, Bro.</option>
                  </select>
                  <span className="form-control-feedback">
                    <i className="material-icons md-36">arrow_drop_down</i>
                  </span>
                </div>
              </form>
              <div
                className="pull-right"
                style={{
                  marginTop: '20px'
                }}
              >
                <button
                  type="button"
                  className="btn btn-default btn-xs"
                  onClick={() => {
                    this.setState({ editing: false });
                  }}
                  style={{
                    marginRight: '15px',
                    border: 'none'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-default btn-xs"
                  style={{
                    backgroundColor: 'white',
                    color: '#4f4f4f'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          }
        </div>
        {!editing ?
          <div
            style={{
              marginTop: '10px'
            }}
          >
            <div className="pull-left">
              <button
                className="btn btn-default btn-xs"
                onClick={() => {
                  this.setState({ editing: true });
                }}
              >
                change
              </button>
            </div>
            <div
              className="pull-right"
              style={{
                marginRight: '15px'
              }}
            >
              <i className="material-icons md-24">delete</i>
            </div>
          </div> : ''}
      </div>
    );
  }
}
