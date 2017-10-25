import React, { Component } from 'react'
import { getContext } from 'recompose'
import { object } from 'prop-types'
import { curry } from 'lodash/fp'

const flip = f => x => y => f(y)(x) 

const withQueries = mapStateToQueries => Wrapped => {

  class WithQueries extends Component {
    componentWillMount () {
      this.unregisterQuery = this.props.store.registerQuery(flip(curry(mapStateToQueries))(this.props))
    }
  
    componentWillUnmount() {
      this.unregisterQuery()
    }
  
    render () {
      const props = this.props
      return <Wrapped {...props}/>
    }
  }

  return getContext({store: object})(WithQueries)
}

export default withQueries