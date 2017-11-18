import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import * as RaceActions from '../actions/race';
import RaceResults from '../components/race-results';

function mapStateToProps(state, ownProps) {
  return {
    race: state.races.find(race => race.id === parseInt(ownProps.match.params.raceId, 10)),
    racers: state.racers.present,
    races: state.races,
    bikes: state.bikes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAdHocRaceClick: () => {
      const newRace = RaceActions.addEmptyRace();
      dispatch(newRace);
      dispatch(push(`/race-preview/${newRace.race.id}`));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RaceResults);
