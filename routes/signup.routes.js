const { Router } = require('express')
const {
    getSignup,
    postSignup
} = require('../controllers/signupController')
const passport = require('passport')
const { upload } = require('../middlewares/multer') 

const signupRouter = Router()

signupRouter.get('/signup', getSignup)

signupRouter.post('/signup',
    upload,
    passport.authenticate("signup", { failureRedirect: '/signup' }),
    postSignup
)

module.exports = signupRouter