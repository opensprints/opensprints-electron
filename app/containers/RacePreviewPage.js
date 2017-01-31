import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import RacePreview from '../components/race-preview/RacePreview';
import * as RaceActions from '../actions/race';
import * as RacerActions from '../actions/racer';

function mapStateToProps(state) {
  return {
    racers: state.racers.present,
    races: state.races,
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
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RacePreview));
