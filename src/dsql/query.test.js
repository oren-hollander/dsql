import { Query, APIQueryBuilder } from './query'

test('builder', () => {
  const api = APIQueryBuilder()
  expect(api.x.y.add(1, 2))
    .toEqual(Query(['x', 'y', 'add'], [1, 2]))
})
