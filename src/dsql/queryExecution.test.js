import { appendUnique, appendUniqueQuery, getUniqueQueriesFromQueryTree } from './queryExecution'
import Query from './query'

describe('query execution', () => {
  test('appendUnique', () => {
    expect(appendUnique(1, [])).toEqual([1])
    expect(appendUnique(1, [2, 3])).toEqual([2, 3, 1])
    expect(appendUnique(1, [1, 2])).toEqual([1, 2])
  })
  
  test('appendUniqueQueries', () => {
    const q1 = () => Query('a', 1)
    const q2 = () => Query('b', 1)
    
    const queryTree = {
      a: q1,
      b: q2
    }
  })
  
  test('getUniqueQueriesFromQueryTree', () => {
    const q1 = () => Query('a', 1)
    const q2 = () => Query('b', 1)
    
    const queryTree = {
      a: q1,
      b: q2,
      c: q1
    }
  
    const uniqueQueries = getUniqueQueriesFromQueryTree(queryTree)
    expect(uniqueQueries).toEqual(
      [
        [
          {
            path: ['a'],
            queryMapper: q1
          }
        ],
        [
          {
            path: ['b'],
            queryMapper: q2
          }
        ],
        [
          {
            path: ['c'],
            queryMapper: q1
          }
        ]
      ]
    )
  })
})
