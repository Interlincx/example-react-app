import React from 'react'
import createReactClass from 'create-react-class'

import router from './router'
import navigate from './navigate'

module.exports = createReactClass({
  getInitialState () {
    return {
      _path: window.location.hash.replace('#/', '')
    }
  },

  componentWillMount () {
    window.addEventListener('hashchange', this.onRoute)
  },

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.onRoute)
  },

  render () {
    var route = router.get('/' + this.state._path)

    if (!route.handler) {
      navigate('/')
      return <div />
    }

    var params = decodeObj(route.params)

    var main = React.createElement(route.handler, params)

    return (
      <div>
        <div>{main}</div>
      </div>
    )
  },

  onRoute () {
    this.setState({ _path: window.location.hash.replace('#/', '') })
  }
})

function decodeObj (obj) {
  var decoded = Object.assign({}, obj)
  Object.keys(decoded).forEach(function (k) {
    decoded[k] = decodeURIComponent(decoded[k])
  })
  return decoded
}
