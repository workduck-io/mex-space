import { mexUtils, randomString } from '../src';

describe('mexUtils', () => {
  it('should work', () => {
    expect(mexUtils()).toEqual('mex-utils');
  });

  it('should work again I guess', () => {
    expect(randomString()).toHaveLength(13);
  });
});
