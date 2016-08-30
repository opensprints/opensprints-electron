import React, { Component, PropTypes } from 'react';
import RacerEdit from './RacerEdit';

export default class PreRaceReview extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    races: PropTypes.array.isRequired,
    racers: PropTypes.array.isRequired,
    bikes: PropTypes.array.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeRace: props.races.find((race) => race.id === parseInt(props.params.race, 10))
    };
  }

  render() {
    const racers = [
      { id: 0, name: 'Speed Racer' },
      { id: 1, name: 'Racer X' },
      { id: 2, name: 'Chim Chim' },
      { id: 3, name: 'Snake Oiler' }
    ];
    const { bikes } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <h4>
              Review Race Settings
            </h4>
            <hr className="heading" />
            <div className="row">
              <div className="col-xs-3 form-group">
                <label>Race Type</label>
                <div>Distance Race</div>
              </div>
              <div className="col-xs-3 form-group">
                <label>Distance</label>
                <div>200.0 meters</div>
              </div>
              <div className="col-xs-3 form-group">
                <label>Visual</label>
                <div>Clock</div>
              </div>
              <div className="col-xs-3 form-group">
                <div>{'\u00A0'}</div>
                <button className="btn btn-default btn-xs pull-right">Edit</button>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {racers.map((racer, i) => (
            <RacerEdit
              key={`QuickRacerDisplay-${i}`}
              bikeIndex={i}
              bike={bikes[i]}
              racer={racer}
            />
          ))}
        </div>
        <div className="row">
          <div className="col-xs-offset-5 col-xs-2">
            <button className="btn btn-primary">Load Race</button>
          </div>
        </div>
      </div>
    );
  }
}
