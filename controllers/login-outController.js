const { errorLogger } = require('../utils/winstonLogger')

const getLogin = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            res.redirect('/')
        } else {
            res.render('pages/login')
        }
    } catch (error) {
        errorLogger.error(`login-outController.js | getLogin(): ${error.message}`)
        return res.status(500).send({ error: true })
    }
}

const postLogin = (req, res) => {
    try {
        const { username } = req.user
        req.session.username = username
        res.redirect('/')
    } catch (error) {
        errorLogger.error(`login-outController.js | postLogin(): ${error.message}`)
        return res.status(500).send({ error: true })
    }
}

const getLogout = (req, res) => {
    try {
        const user = req.session.username

        req.logout((error) => {
            errorLogger.error(`login-outController.js | getLogout(): ${error}`)
            res.status(500).render('pages/login', {
                user: req.user,
                message: 'Se produjo un error inesperado. Intente nuevamente'
            })
        })

        res.render('pages/logout',
            { username: user }
        )
    } catch (error) {
        errorLogger.error(`login-outController.js | getLogout() ${error}`)
        res.status(500).render('pages/login', {
            user: req.user,
            message: 'Se produjo un error inesperado. Intente nuevamente'
        })
    }
}

module.exports = {
    getLogin,
    postLogin,
    getLogout
}