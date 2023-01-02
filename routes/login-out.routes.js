const { Router } = require('express')
const {
    getLogin,
    postLogin,
    errorLogin,
    getLogout
} = require('../controllers/login-outController')
const passport = require('passport')
const { isAuthenticated } = require('../middlewares/functions')

const loginRouter = Router()
const logoutRouter = Router()

loginRouter.get('/login', getLogin)

loginRouter.get('/errorlogin', errorLogin)

loginRouter.post('/login',
    passport.authenticate('login', { failureRedirect: '/errorLogin' }),
    postLogin
)

logoutRouter.get('/logout', isAuthenticated, getLogout)

module.exports = {
    loginRouter,
    logoutRouter
}