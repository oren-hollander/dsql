import Component from '../ds/component'

export const Query = (path, ...args) => ({path, args})

const f = () => null

const DSProxy = path => new Proxy(f, {
  get: (target, property) => DSProxy([...path, property]),
  apply: (target, thisArg, argumentList) => Query(path, argumentList)
})

export const APIQueryBuilder = () => DSProxy([])

