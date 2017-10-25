import { SELECT_COMPONENT } from './actions'

const reducer = (selectedComponentId = null, action) => {
  if (action.type === SELECT_COMPONENT)
    return action.componentId
  
  return selectedComponentId
}