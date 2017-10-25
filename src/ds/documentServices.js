import { emptyDocument, addComponent, removeComponent, getComponent } from './document'

const DocumentServices = () => {
  let document = emptyDocument()

  const addComponentToDocument = component => {
    document = addComponent(component, document)
  }

  const removeComponentFromDocument = id => {
    document = removeComponent(id, document)
  }

  const getComponentFromDocument = componentId => getComponent(componentId, document)

  return {
    addComponent: addComponentToDocument,
    removeComponent: removeComponentFromDocument,
    getComponent: getComponentFromDocument
  }
}

export default DocumentServices