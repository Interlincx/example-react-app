import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import createReactClass from 'create-react-class'

import api from '../api'
import navigate from '../navigate'

module.exports = createReactClass({
  getInitialState () {
    return {
      thing: {},
      _status: 'READY'
    }
  },

  render () {
    return (
      <div style={{padding: 40}}>
        <h1>Create Thing</h1>
        { this.renderCreate() }
      </div>
    )
  },

  renderCreate () {
    return (
      <div>
        <TextField
          name='name'
          placeholder='Name'
          margin='normal'
          onChange={this.changeThing}
          value={this.state.thing.name || ''} />

        <br />

        <TextField
          name='color'
          placeholder='Color'
          margin='normal'
          onChange={this.changeThing}
          value={this.state.thing.color || ''} />

        <br />

        <Button
          raised
          color='primary'
          onClick={this.createThing}
          style={{margin: '20px 10px 0 0'}} >
          Create Thing
        </Button>

        <Button raised color='default' href={'#/things'} >
          Back
        </Button>
      </div>
    )
  },

  createThing () {
    var thing = this.state.thing
    if (!thing.name || !thing.color) return

    this.setState({_status: 'LOADING'})
    api.putThing(thing.name, thing, (err) => {
      if (err) {
        this.setState({_status: 'ERROR'})
        return console.error(err)
      }

      this.setState({thing: {}, _status: 'READY'})
      navigate(`/things`)
    })
  },

  changeThing (evt) {
    var thing = this.state.thing
    thing[evt.target.name] = evt.target.value
    this.setState({thing: thing})
  }
})
