const { errorLogger } = require('../utils/winstonLogger')

class SignupController {
    constructor() { }

    getSingup = (req, res) => {
        try {
            req.isAuthenticated()
                ? res.redirect('/')
                : res.render('pages/signup')
        } catch (error) {
            errorLogger.error(`signupController.js | getSignup(): ${error}`)
            return res.status(500).send({ error: true })
        }
    }

    postSignup = (req, res) => {
        try {
            req.session.username = req.user.username

            res.redirect('/')
        } catch (error) {
            errorLogger.error(`signupController.js | postSignup(): ${error}`)
            return res.status(500).send({ error: true })
        }
    }
}

module.exports = SignupController

/* const signup = {
    get: (req, res) => {
        try {
            if (req.isAuthenticated()) {
                res.redirect('/')
            } else {
                res.render('pages/signup')
            }
        } catch (error) {
            errorLogger.error(`signup: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) => {
        try {
            const { username } = req.user
            req.session.username = username
            res.redirect('/')
        } catch (error) {
            errorLogger.error(`signup: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) => {
        try {
            res.render('pages/errorSignup')
        } catch (error) {
            errorLogger.error(`signup: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    }
}

module.exports = { signup } */