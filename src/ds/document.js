import { concat, reject, find, curry } from 'lodash/fp'

export const Document = components => components

export const emptyDocument = () => Document([])

const byId = id => object => object.id === id

export const addComponent = curry((component, document) => Document(concat(document, component)))
export const removeComponent = curry((id, document) => Document(reject(byId(id), document)))
export const getComponent = curry((id, document) => { 
  return find(byId(id), document)
})
