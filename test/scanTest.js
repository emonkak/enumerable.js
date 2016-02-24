import scan from '../dist/scan'
import assert from 'assert'

describe('scan()', function() {
    it('should generates a sequence of accumulated values', function() {
        assert.deepEqual(Array.from([1, 2, 3, 4, 5]::scan(0, (total, n) => total + n)), [1, 3, 6, 10, 15])
        assert.deepEqual(Array.from([]::scan(0, (total, n) => total + n)), [])
    })
})
