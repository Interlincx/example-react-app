import React from 'react'
import Paper from 'material-ui/Paper'
import Button from 'material-ui/Button'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import createReactClass from 'create-react-class'
import { CircularProgress } from 'material-ui/Progress'

import api from '../api'

module.exports = createReactClass({
  getInitialState () {
    return {
      thing: {name: this.props.name},
      _status: 'READY'
    }
  },

  componentWillMount () {
    this.getThing()
  },

  render () {
    return (
      <div style={{padding: 40}}>
        <h1>Edit Thing</h1>
        { {
          'READY': this.renderEdit,
          'ERROR': this.renderError,
          'LOADING': this.renderLoading
        }[this.state._status]() }
      </div>
    )
  },

  renderEdit () {
    return (
      <div>
        <TextField
          disabled
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
          onClick={this.updateThing}
          style={{margin: '20px 10px 0 0'}} >
          Update Thing
        </Button>

        <Button raised color='default' href={'#/things'} >
          Back
        </Button>
      </div>
    )
  },

  renderLoading () {
    return (
      <div style={{textAlign: 'center', padding: 50}}>
        <CircularProgress size={100} />
      </div>
    )
  },

  renderError () {
    return (
      <div style={{textAlign: 'center'}}>
        <Paper style={{width: 300, padding: 20, margin: '0 auto'}}>
          <Typography type='headline' component='h1'>
            We're Sorry!
          </Typography>
          <p>Something went wrong...</p>
          <p>
            <Button raised color='primary' onClick={this.getThing} >
              Retry?
            </Button>
          </p>
        </Paper>
      </div>
    )
  },

  getThing () {
    var name = this.state.thing.name
    this.setState({_status: 'LOADING'})
    api.getThing(name, (err, thing) => {
      if (err) {
        this.setState({_status: 'ERROR'})
        return console.error(err)
      }

      this.setState({thing, _status: 'READY'})
    })
  },

  updateThing () {
    var thing = this.state.thing
    if (!thing.name || !thing.color) return

    this.setState({_status: 'LOADING'})
    api.putThing(thing.name, thing, (err) => {
      if (err) {
        this.setState({_status: 'ERROR'})
        return console.error(err)
      }

      this.setState({_status: 'READY'})
    })
  },

  changeThing (evt) {
    var thing = this.state.thing
    thing[evt.target.name] = evt.target.value
    this.setState({thing: thing})
  }
})
