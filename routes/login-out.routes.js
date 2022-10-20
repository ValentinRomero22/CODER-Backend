import { Router } from 'express'
import { login } from '../controllers/login.js'
import passport from 'passport'
import { isAuthenticated } from "../middlewares/functions.js"

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

export { loginRouter, logoutRouter }