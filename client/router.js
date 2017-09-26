import Router from 'http-hash'

import auth from './auth'
import navigate from './navigate'

var router = module.exports = Router()

router.set('/', restrict(require('./things/list.jsx')))
router.set('/things', restrict(require('./things/list.jsx')))
router.set('/things/create', restrict(require('./things/create.jsx')))
router.set('/things/edit/:name', restrict(require('./things/edit.jsx')))

router.set('/login', auth.login)
router.set('/logout', auth.logout)
router.set('/signup', auth.signup)
router.set('/confirm/:email/:confirmToken', auth.confirm)
router.set('/change-password-request', auth.changePasswordRequest)
router.set('/change-password/:email/:changeToken', auth.changePassword)

function restrict (component) {
  return function () {
    if (!auth.isLoggedIn()) navigate('/login')
    return component
  }
}
