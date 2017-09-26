import React from 'react'
import createReactClass from 'create-react-class'

import auth from './auth'
import router from './router'
import navigate from './navigate'

module.exports = createReactClass({
  getInitialState () {
    return {
      _path: window.location.hash.replace('#/', ''),
      email: auth.email()
    }
  },

  componentWillMount () {
    auth.client.on('email', this.onAuthChange)
    window.addEventListener('hashchange', this.onRoute)
  },

  componentWillUnmount () {
    auth.client.off('email', this.onAuthChange)
    window.removeEventListener('hashchange', this.onRoute)
  },

  render () {
    var route = router.get('/' + this.state._path)

    if (!route.handler) {
      navigate('/')
      return <div />
    }

    var params = decodeObj(route.params)

    var main = isReact(route.handler)
      ? React.createElement(route.handler, params)
      : React.createElement(route.handler(params), params)

    return (
      <div>
        <div>{main}</div>
      </div>
    )
  },

  onRoute () {
    this.setState({ _path: window.location.hash.replace('#/', '') })
  },

  onAuthChange (email) {
    this.setState({email: email})
    if (!email) navigate('/login')
  }
})

function decodeObj (obj) {
  var decoded = Object.assign({}, obj)
  Object.keys(decoded).forEach(function (k) {
    decoded[k] = decodeURIComponent(decoded[k])
  })
  return decoded
}

function isReact (fn) {
  return (typeof fn === 'function') && (!!fn.prototype.isReactComponent)
}
