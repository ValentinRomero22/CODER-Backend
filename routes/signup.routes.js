const { Router } = require('express')
const {
    getSignup,
    postSignup,
    errorSignup
} = require('../controllers/signupController')
const passport = require('passport')
const { upload } = require('../middlewares/multer')

const signupRouter = Router()

signupRouter.get('/signup', getSignup)

signupRouter.get('/errorSignup', errorSignup)

signupRouter.post('/signup',
    upload,
    passport.authenticate("signup", { failureRedirect: '/errorSignup' }),
    postSignup
)

module.exports = signupRouter