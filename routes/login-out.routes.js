const { Router } = require('express')
const LoginController = require('../controllers/loginController')
//const { login } = require('../controllers/loginController')
const passport = require('passport')
const isAuthenticated = require('../middlewares/functions')
/* const { errorLogger } = require('../utils/winstonLogger') */

const loginRouter = Router()
const logoutRouter = Router()

class LoginRouter {
    constructor() {
        this.loginController = new LoginController()
    }

    startLogin() {
        loginRouter.get('/login', this.loginController.getLogin)
        loginRouter.post(
            '/login',
            passport.authenticate("login", { failureRedirect: '/login' }),
            this.loginController.postLogin            
        )
        
        return loginRouter
    }
    
    startLogout() {
        logoutRouter.get('/logout', isAuthenticated, this.loginController.getLogout)

        return logoutRouter
    }
}

module.exports = LoginRouter

/*loginRouter.get('/login', login.get)

loginRouter.get('/errorLogin', login.error)

loginRouter.post(
    '/login',
    passport.authenticate("login", { failureRedirect: '/errorLogin' }),
    login.post
)

logoutRouter.get('/logout', isAuthenticated, (req, res) => {
    const user = req.session.username

    req.session.destroy((error) => {
        if (error) {
            errorLogger.error(`login-out.routes: ${error}`)
            return res.status(500).render('pages/logout', { error: true })
        }

        res.status(200).render('pages/logout', { user: user })
    })
})

module.exports = { loginRouter, logoutRouter } */