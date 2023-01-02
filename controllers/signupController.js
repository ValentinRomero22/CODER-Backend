const { errorLogger } = require('../utils/winstonLogger')
const { sendRegisterMail } = require('../config/mailConfig')
//const { saveNewCart } = require('../controllers/cartController')
const { saveNewCartService } = require('../services/cartService')

const getSignup = (req, res) => {
    try {
        if (req.isAuthenticated()) {
            return res.redirect('/productos')
        } else {
            return res.render('pages/signup')
        }
    } catch (error) {
        errorLogger.error(`signupController.js | getSignup(): ${error.message}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const postSignup = async (req, res) => {
    try {
        const { username } = req.user
        req.session.username = username

        await sendRegisterMail(req.user)

        const newCart = {
            userId: req.user._id,
            userEmail: req.user.email,
            deliveryAddress: req.body.address
        }

        await saveNewCartService(newCart)

        return res.redirect('/productos')
    } catch (error) {
        errorLogger.error(`signupController.js | postSignup(): ${error.message}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const errorSignup = async (req, res) => {
    try {
        return res.status(500).render('pages/error', {
            statusCode: 500,
            signupMessage: 'Se produjo un error al registrarse. Intente nuevamente'
        })
    } catch (error) {
        errorLogger.error(`signupController.js | errorSignup(): ${error.message}`)
        return res.status(500).render('pages/error', {
            statusCode: 500
        })
    }
}

module.exports = {
    getSignup,
    postSignup,
    errorSignup
}