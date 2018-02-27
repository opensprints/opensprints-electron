import { expect } from 'chai';
import moment from 'moment';
import races from '../../app/reducers/races';
import { endOngoingRace } from '../../app/actions/race';

describe('Races Reducer', () => {
  it('should setup initial state properly', () => {
    expect(races(undefined, { type: '' })).length.to.be(0);
  });
  describe('ADD_RACES Action', () => {
    it('should add one race when there is fewer racers selected than bikes');
    it('should add one race with the correct number of racers');
    it('should add two races when there is more racers than bikes');
  });
  describe('ADD_AD_HOC_RACE Action', () => {
    it('should add an empty race');
  });
  describe('UPDATE_RACE Action', () => {
    it('should replace the corresponding race with the changed one in the action');
  });
  describe('REMOVE_RACE Action', () => {
    it('should mark the race as deleted and set a timestamp of when it was deleted');
  });
  describe('CHANGE_RACE_ORDER Action', () => {
    it('should swap two adjacent races in the races array');
  });
  describe('START_RACE Action', () => {
    it('should set startTime and mark the race as current');
  });
  describe('RESTART_RACE Action', () => {
    it('should remove the startTime and finishTime properties');
    it('should fill results arrays with 0 for the number of bikes');
  });
  describe('FINISH_RACER Action', () => {
    describe('array of result objects', () => {
      it('should set finishTime property object');
      it('should set correct place for first place');
      it('should set correct place for second place');
      it('should set correct place for third place');
      it('should set correct place for fourth place');
    });
  });
  describe('FINISH_ONGOING_RACE Action', () => {
    it('should set current property to false');
    it('should set finished property to true');
    it('should set finishedDate with the current moment');
  });
  describe('END_ONGOING_RACE Action', () => {
    const state = [
      {
        id: 1,
        bikeRacerMap: {0: 2, 1: 3},
        createdDate: moment('2018-01-19T06:02:00.000Z'),
        startTime: moment('2018-01-19T06:07:00.000Z'),
        current: true,
        measurementSystem: 'metric',
        raceType: 'distance',
        raceDistance: 100,
        results: [null, { finishTime: moment('2018-01-19T06:08:00.000Z'), place: 1 }]
      }
    ];
    const action = endOngoingRace(state[0], [0,0]);

    describe('array of result objects', () => {
      const expectedResults = [
        { place: -1, bikeTicks: 0, finishTime: moment() },
        { finishTime: moment('2018-01-19T06:08:00.000Z'), place: 1 }
      ];

      it('should not erase existing results', () => {
        const nextState = races(state, action);
        expect(nextState[0].results[1].place).to.equal(expectedResults[1].place);
      });

      it('should set anyone who hasn\'t finished to have a place property value of -1', () => {
        const nextState = races(state, action);
        expect(nextState[0].results[0].place).to.equal(expectedResults[0].place);
        expect(moment.isMoment(nextState[0].results[0].finishTime)).to.equal(true);
      });
    });

    it('should set finishedDate as current moment');
    it('should set current property to false');
  });
});
