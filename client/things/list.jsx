import React from 'react'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Table, { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/Table'
import CircularProgress from '@material-ui/core/CircularProgress'
import createReactClass from 'create-react-class'

import api from '../api'
import navigate from '../navigate'

module.exports = createReactClass({
  getInitialState () {
    return {
      things: [],
      _status: 'READY'
    }
  },

  componentWillMount () {
    this.getList()
  },

  render () {
    return (
      <div style={{padding: 40}}>
        <h1>Things List</h1>

        { {
          'READY': this.renderTable,
          'ERROR': this.renderError,
          'LOADING': this.renderLoading
        }[this.state._status]() }
      </div>
    )
  },

  renderTable () {
    return (
      <Paper>
        <Button
          fab
          color='primary'
          href='/#/things/create'
          style={{position: 'absolute', bottom: 30, right: 30}}>
          <AddIcon />
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { this.state.things.map((thing) => (
              <TableRow
                key={thing.name}
                hover
                style={{cursor: 'pointer'}}
                onClick={this.editThing.bind(this, thing.name)} >
                <TableCell>{thing.name}</TableCell>
                <TableCell>{thing.color}</TableCell>
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </Paper>
    )
  },

  renderError () {
    return (
      <div style={{textAlign: 'center'}}>
        <Paper style={{width: 300, padding: 20, margin: '0 auto'}}>
          <Typography type='headline' component='h1'>
            We're Sorry!
          </Typography>
          <p>We couldn't load the list...</p>
          <p>
            <Button raised color='primary' onClick={this.getList} >
              Retry?
            </Button>
          </p>
        </Paper>
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

  getList () {
    this.setState({_status: 'LOADING'})
    api.listThings('!', '~', (err, things) => {
      if (err) {
        this.setState({_status: 'ERROR'})
        return console.error(err)
      }
      this.setState({things: things, _status: 'READY'})
    })
  },

  editThing (name) {
    navigate(`/things/edit/${name}`)
  }
})
