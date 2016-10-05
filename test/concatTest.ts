import * as assert from 'assert';
import Enumerable from '../src/bundle';

describe('concat()', () => {
    it('should concatenates two sequences', () => {
        assert.deepEqual(new Enumerable([]).concat([]).toArray(), []);
        assert.deepEqual(new Enumerable([1, 2, 3]).concat([4, 5, 6]).toArray(), [1, 2, 3, 4, 5, 6]);
        assert.deepEqual(new Enumerable([1, 2, 3]).concat([4, 5, 6], [7, 8, 9]).toArray(), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });
});