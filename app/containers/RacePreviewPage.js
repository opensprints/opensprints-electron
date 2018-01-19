import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import RacePreview from '../components/race-preview/RacePreview';
import * as RaceActions from '../actions/race';
import * as RacerActions from '../actions/racer';

function mapStateToProps(state, ownProps) {
  return {
    racers: state.racers.present,
    race: state.races.find(race => race.id === parseInt(ownProps.match.params.raceId, 10)),
    bikes: state.bikes,
    defaultRaceSettings: state.defaultRaceSettings,
    racerAttributes: state.racerAttributes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators({ ...RaceActions, ...RacerActions, push }, dispatch),
    addNewRacer: (racer, race, bikeIndex) => {
      const newRacerAction = RacerActions.addRacer(racer);
      dispatch(newRacerAction);

      dispatch(RaceActions.updateRace(Object.assign({}, race, {
        bikeRacerMap: Object.assign({}, race.bikeRacerMap, {
          [bikeIndex]: newRacerAction.racer.id
        })
      })));
    },
    loadRace: ({ race, bikes, raceSettings }) => {
      const newRaceSettings = raceSettings.raceType === 'distance' ?
        {
          raceType: 'distance',
          raceDistance: raceSettings.raceDistance,
        } :
        {
          raceType: 'time',
          // todo: trialDuration will probably need to be stored as an int and converted to a moment
          // using moment.duration(x*10) at the right time
          trialDuration: raceSettings.trialDuration,
          timerDirection: raceSettings.timerDirection,
        };

      const newRace = Object.assign({}, race, newRaceSettings, {
        measurementSystem: raceSettings.measurementSystem,
        results: new Array(bikes.length).fill(null)
      });
      dispatch(RaceActions.updateRace(newRace));
      dispatch(push(`/race/${race.id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RacePreview);
