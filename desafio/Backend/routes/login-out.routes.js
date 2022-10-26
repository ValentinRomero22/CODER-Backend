const { Router } = require('express')
const { login } = require('../controllers/login')
const passport = require('passport')
const { isAuthenticated } = require('../middlewares/functions')

const loginRouter = Router()
const logoutRouter = Router()

loginRouter.get('/login', login.get)

loginRouter.get('/errorLogin', login.error)

loginRouter.post(
    '/login',
    passport.authenticate("login", { failureRedirect: '/errorLogin' }),
    login.post
)

logoutRouter.get('/logout', isAuthenticated, (req, res) => {
    const user = req.session.username

    req.logout((error) => {
        if (error) res.json(error)
    })

    res.render('pages/logout', { user: user })
})

module.exports = { loginRouter, logoutRouter }