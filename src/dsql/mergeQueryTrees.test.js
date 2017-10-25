import mergeQueryTrees from './mergeQueryTrees'
import Query from './query'

test('mergeQueryTrees', () => {
  const q1 = () => Query('a', 1, 2)
  const q2 = () => Query('b', 3)

  const qt1 = {
    aa: q1
  }

  const qt2 = {
    bb: { 
      cc: q2,
      dd: {
        ee: q1
      }
    }
  }

  const qt = mergeQueryTrees([qt1, qt2])
  expect(qt).toEqual({
    aa: q1, 
    bb: {
      cc: q2,
      dd: {
        ee: q1
      }
    }
  })
})