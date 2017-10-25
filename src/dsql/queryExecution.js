import { reduce, map, forEach, concat, without, uniqWith, isEqual, invoke, toPairs, isFunction, indexOf, curry } from 'lodash/fp'
import mergeQueryTrees from './mergeQueryTrees'

const UniqueQuery = (path, queryMapper) => ({ path, queryMapper })

export const appendUnique = (value, array) => indexOf(value, array) >= 0 ? array : [...array, value]
const appendPath = (element, path) => [...path, element]

export const appendUniqueQuery = curry((uniqueQueries, path, queryTree) => 
  map(([key, value]) => isFunction(value) 
      ? appendUnique(UniqueQuery(appendPath(key, path), value), uniqueQueries)
      : appendUniqueQuery(uniqueQueries, appendPath(key, path), value), 
      toPairs(queryTree)))

export const getUniqueQueriesFromQueryTree = appendUniqueQuery([], [])

const executeQuery = (ds, uniqueQuery, state, props) => {
  const query = uniqueQuery.queryMapper(state, props)
  return {
    [uniqueQuery.path]: invoke(query.path, query.args, ds)
  }
}

const executeQueries = (ds, state, props, queryTrees) => {
  const uniqueQueries = getUniqueQueriesFromQueryTree(mergeQueryTrees(queryTrees))
  
  const reducer = (result, uniqueQuery) => assign(
    ...result, 
    executeQuery(ds, uniqueQuery, state, props)
  )

  return reduce(reducer, {}, uniqueQueries)
}

export default executeQueries