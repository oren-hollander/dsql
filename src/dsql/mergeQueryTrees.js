import { reduce, merge } from 'lodash/fp'

const mergeQueryTrees = reduce(merge, {})

export default mergeQueryTrees