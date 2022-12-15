const { errorLogger } = require('../utils/winstonLogger')

class LoginController {
    constructor() { }

    getLogin = (req, res) => {
        try {
            req.isAuthenticated()
                ? res.redirect('/')
                /* ? res.render('pages/products') */
                : res.render('pages/login')
        } catch (error) {
            errorLogger.error(`loginController.js | getLogin(): ${error}`)
            return res.status(500).send({ error: true })
        }
    }

    postLogin = (req, res) => {
        try {
            req.session.username = req.user.username

            res.redirect('/')
            /* res.render('pages/products') */
        } catch (error) {
            errorLogger.error(`loginController.js | postLogin(): ${error}`)
            return res.status(500).send({ error: true })
        }
    }

    getLogout = (req, res) => {
        try {
            const user = req.session.username

            req.logout((error) => {
                errorLogger.error(`loginController.js | getLogout(): ${error}`)
                res.status(500).render('pages/login', {
                    user: req.user,
                    message: 'Se produjo un error inesperado. Intente nuevamente'
                })
            })

            res.render('pages/logout',
                { username: user }
            )
        } catch (error) {
            errorLogger.error(`loginController.js | getLogout(): ${error}`)
            res.status(500).render('pages/login', {
                user: req.user,
                message: 'Se produjo un error inesperado. Intente nuevamente'
            })
        }
    }
}

module.exports = LoginController

/* const login = {
    get: (req, res) => {
        try {
            if (req.isAuthenticated()) {
                res.redirect('/')
            } else {
                res.render('pages/login')
            }
        } catch (error) {
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) => {
        try {
            const { username } = req.user
            req.session.username = username
            res.redirect('/')
        } catch (error) {
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) => {
        try {
            res.render('pages/errorLogin')
        } catch (error) {
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    }
}

module.exports = { login } */