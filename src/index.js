import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import apiDataReducer from './dsql/reducer'
import ThrottlingStore from './dsql/store'
import DocumentServices from './ds/documentServices'

const defaultEditorState = {
  selectedComponentId: null
}

const editorReducer = (state = defaultEditorState, action) => {
  switch(action.type){
    case 'select-component':
      return {selectedComponentId: action.componentId}
    default: 
      return state
  }
}

const reducer = combineReducers({
  viewer: apiDataReducer,
  editor: editorReducer
})

const store = createStore(reducer)
const ds = DocumentServices()

const throttlingStore = ThrottlingStore(window.requestAnimationFrame, store, ds)

ReactDOM.render(
  <Provider store={throttlingStore}><App/></Provider>, 
  document.getElementById('root')
)

setTimeout(() => {
  ds.addComponent({id: 'comp-1', layout: 'lalala'})
  throttlingStore.dispatch({type: 'select-component', componentId: 'comp-1'})
}, 2000)
registerServiceWorker()
