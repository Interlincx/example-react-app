import Router from 'http-hash'

var router = module.exports = Router()

router.set('/', require('./things/list.jsx'))
