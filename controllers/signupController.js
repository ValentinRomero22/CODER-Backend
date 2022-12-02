const { errorLogger } = require('../utils/winstonLogger')
const { sendRegisterMail } = require('../config/mailConfig')
const { saveNewCart } = require('../controllers/cartController')

const getSignup = (req, res) => {
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
}

const postSignup = async (req, res) => {
    try {
        const { username } = req.user
        req.session.username = username

        await sendRegisterMail(req.user)
        await saveNewCart(req, res)
        res.redirect('/')
    } catch (error) {
        errorLogger.error(`signup: ${error.message}`)
        return res.status(500).send({ error: true })
    }
}

module.exports = {
    getSignup,
    postSignup
}