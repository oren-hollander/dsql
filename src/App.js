import React from 'react'
import logo from './logo.svg'
import './App.css'
import withQueries from './dsql/withQueries'
import { connect } from 'react-redux'

const MyComp = ({selectedComponent}) => {
  if(!selectedComponent)
    return null
  return (<div>
    {selectedComponent.id}{selectedComponent.layout}
  </div>)
}

const mapStateToProps = state => ({selectedComponent: state.viewer.selectedComponent})

const MyConnectedComp = connect(mapStateToProps)(MyComp)

const mapStateToQueries = (state, props) => [{statePath: 'selectedComponent', functionPath: 'getComponent', args: [state.editor.selectedComponentId]}]

const MyCompWithQueries = withQueries(mapStateToQueries)(MyConnectedComp)

const App = () => 
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="App-intro">
      To get started, edit <code>src/App.js</code> and save to reload.
    </p>
    <MyCompWithQueries/>
  </div>

export default App
