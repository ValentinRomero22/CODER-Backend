const { Router } = require('express')
const SignupController = require('../controllers/signupController')
//const { signup } = require('../controllers/signupController')
const passport = require('passport')

const signupRouter = Router()

class SignupRouter {
    constructor() {
        this.signupController = new SignupController()
    }

    start() {
        signupRouter.get('/signup', this.signupController.getSingup)
        signupRouter.post(
            '/signup',
            passport.authenticate("signup", { failureRedirect: '/signup' }),
            this.signupController.postSignup
        )

        return signupRouter
    }
}

module.exports = SignupRouter