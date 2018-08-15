var auth = require('./auth')

var API = require('./config').api

module.exports = {
  getThing,
  putThing,
  listThings
}

function listThings (gte, lte, cb) {
  var url = `${API}/things/stream/${gte}/${lte}`
  auth.get(url, cb)
}

function getThing (id, cb) {
  var url = `${API}/things/get/${id}`
  auth.get(url, cb)
}

function putThing (id, value, cb) {
  var url = `${API}/things/put/${id}`
  auth.post(url, value, cb)
}
