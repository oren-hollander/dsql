import { reduce, assign, map, flatMap, forEach, concat, without, invokeArgs } from 'lodash/fp'
import BreakerCallback from './breakerCallback'
import { setAPIData } from './actions'

const call = f => f()

const ThrottlingStore = (requestAnimationFrame, store, ds) => {

  let subscribers = []
  let stateToQueriesMappers = []
  let shouldNotifySubscribers = false
  
  const notifySubscribers = () => {
    shouldNotifySubscribers = false
    
    const state = store.getState()
    const queries = flatMap(mapStateToQueries => mapStateToQueries(state), stateToQueriesMappers)
    
    const pathResults = map(({statePath, functionPath, args}) => {
      const result = invokeArgs(functionPath, args, ds)
      return {path: statePath, result}
    }, queries)

    const apiData = reduce((results, result) => assign(results, {[result.path]: result.result}), {}, pathResults)

    turnNotificationsOn.turnOff()
    store.dispatch(setAPIData(apiData))
    turnNotificationsOn.turnOn()
    forEach(call, subscribers)
  }

  const tick = () => {
    requestAnimationFrame(tick)
    if (shouldNotifySubscribers)
      notifySubscribers()
  }

  const subscribe = callback => {
    subscribers = concat(subscribers, callback)
    return () => {
      subscribers = without(callback, subscribers)
    }
  }

  const registerQuery = mapStateToQueries => {
    stateToQueriesMappers = concat(stateToQueriesMappers, mapStateToQueries)
    return () => {
      stateToQueriesMappers = without(mapStateToQueries, stateToQueriesMappers)
    }
  }

  const turnNotificationsOn = BreakerCallback(() => {
    shouldNotifySubscribers = true
  })
  
  store.subscribe(turnNotificationsOn)

  requestAnimationFrame(tick)

  return {
    registerQuery,
    subscribe,
    dispatch: store.dispatch,
    getState: store.getState
  }
}

export default ThrottlingStore