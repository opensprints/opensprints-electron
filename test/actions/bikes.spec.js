/* eslint no-unused-expressions: 0 */
import { expect } from 'chai';
import * as actions from '../../app/actions/bikes';


describe('actions', () => {
  it('updateBikeConfiguration should create updateBikeConfiguration action', () => {
    const index = 0;
    const bike = {};
    expect(actions.updateBikeConfiguration(index, bike)).to.deep.equal(
      { type: actions.UPDATE_BIKE_CONFIGURATION, index, bike }
    );
  });

  it('updateBikesAvailable should create updateBikesAvailable action', () => {
    expect(actions.updateBikesAvailable(2)).to.deep.equal(
      { type: actions.UPDATE_BIKES_AVAILABLE, n: 2 }
    );
  });
});
