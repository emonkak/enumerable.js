import minBy from '../dist/minBy'
import assert from 'assert'

describe('minBy()', function() {
    it('should returns the elements with the maximum key value by using the default comparer to compare key values', function() {
        assert.deepEqual([]::minBy(), [])
        assert.deepEqual([1, 2, 3, 2, 1]::minBy(x => x), [1, 1])
        assert.deepEqual(['a', 'ab', 'abc', 'ab', 'a']::minBy(s => s.length), ['a', 'a'])
    })
})
