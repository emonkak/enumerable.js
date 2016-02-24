import startWith from '../dist/startWith'
import assert from 'assert'

describe('startWith()', function() {
    it('should returns the source sequence prefixed with the specified value', function() {
        assert.deepEqual(Array.from([0, 1, 2, 3, 4]::startWith(0)), [0, 0, 1, 2, 3, 4])
    })
})
