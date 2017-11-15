import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './RacerSelect.css';

const racerAttributeSelect = (key, options, value, onChange) => (
  <div key={`racer-select-${key}`} className="select-container block">
    <select
      className="form-control text-capitalize"
      onChange={onChange}
      value={value || key}
    >
      <option value={key} disabled>{key}</option>
      {
        options.map((option, i) => (
          <option
            key={`${key}-option-${i}`}
            value={option}
          >
            {option}
          </option>
        ))
      }
    </select>
    <span className="form-control-feedback">
      <i className="material-icons md-36">arrow_drop_down</i>
    </span>
  </div>
);

export default class RacerEdit extends Component {
  static propTypes = {
    bikeIndex: PropTypes.number.isRequired,
    bike: PropTypes.object.isRequired,
    racer: PropTypes.object,
    racerAttributes: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onSwap: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false,
      racer: Object.assign({}, props.racer)
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      racer: Object.assign({}, nextProps.racer)
    });
  }

  render() {
    const { racerAttributes, bikeIndex, bike, onDelete, onAdd, onEdit, onSwap } = this.props;
    const { editing, racer } = this.state;
    const canAdd = !editing && !racer.createdDate;

    return (
      <div className={`${styles['racer-select']} col-xs-3`}>
        <div
          className={`${styles['bike-indicator']} unselectable ${canAdd ? styles.action : ''}`}
          style={{ backgroundColor: bike.color }}
          onClick={() => {
            this.setState({
              editing: true
            });
          }}
        >
          {canAdd ? (
            <i
              className={`material-icons ${styles.addRacerIcon}`}
              style={{
                fontSize: '30px'
              }}
            >
              add
            </i>
          ) : bikeIndex + 1}
        </div>
        {bikeIndex > 0 ?
          <div
            style={{
              position: 'absolute',
              display: 'inline-block',
              left: '-16px',
              top: '20px'
            }}
            onClick={() => {
              onSwap(bikeIndex);
            }}
          >
            <i
              className={`material-icons md-36 unselectable ${styles.action}`}
            >
              swap_horiz
            </i>
          </div> : ''
        }
        <div className={styles['racer-edit-container']}>
          {!editing ? <label className={styles.name}>{racer.name}</label> :
          <div>
            <form>
              <div className="form-group">
                <div className="input-group">
                  <input
                    className="form-control input"
                    style={{
                      fontSize: '20px',
                      color: 'white',
                      paddingTop: 0,
                      marginTop: '6px',
                      height: '28px',
                      background: 'transparent',
                      borderRadius: 0,
                      boxShadow: 'none',
                      border: 'none',
                      borderBottom: 'white solid 2px'
                    }}
                    type="text"
                    value={racer.name}
                    onChange={(e) => {
                      this.setState({
                        racer: Object.assign({}, racer, { name: e.target.value })
                      });
                    }}
                  />
                </div>
              </div>
              {
                Object.keys(racerAttributes).map((key) => (
                  racerAttributeSelect(key, racerAttributes[key], this.state.racer[key], (e) => {
                    this.setState({
                      racer: Object.assign({}, racer, { [key]: e.target.value })
                    });
                  })
                ))
              }
            </form>
            <div
              className="pull-right"
              style={{
                marginTop: '20px',
                marginBottom: '20px'
              }}
            >
              <button
                type="button"
                className="btn btn-default btn-xs"
                onClick={() => {
                  this.setState({
                    editing: false,
                    racer: Object.assign({}, this.props.racer)
                  });
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
                onClick={() => {
                  this.setState({
                    editing: false
                  });
                  if (!racer.createdDate) {
                    onAdd(racer);
                  } else {
                    onEdit(racer);
                  }
                }}
              >
                { racer.createdDate ? 'Save' : 'Create' }
              </button>
            </div>
          </div>
          }
        </div>
        {(!editing && racer.createdDate) ?
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
              <i
                className={`material-icons md-24 unselectable ${styles.action}`}
                onClick={onDelete}
              >
                delete
              </i>
            </div>
          </div> : ''}
      </div>
    );
  }
}
