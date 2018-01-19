import { expect } from 'chai';
import races from '../../app/reducers/races';

describe('Races Reducer', () => {
  it('should setup initial state properly', () => {
    expect(races(undefined, { type: '' })).length.to.be(0);
  });
});
