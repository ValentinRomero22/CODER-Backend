const passport = require('passport')
const { mongoSession } = require('../config/mongoSession')
const {
    passportLogin,
    passportSignup,
    serializeUser,
    deserializeUser
} = require('../config/passportConfig')

const passportSession = (app) =>{
    mongoSession(app)

    passport.use("login", passportLogin.localStrategy)
    passport.use("signup", passportSignup.localStrategy)

    serializeUser()
    deserializeUser()

    app.use(passport.initialize())
    app.use(passport.session())

    app.use((req, res, next) =>{
        req.session.touch()
        next()
    })
}

module.exports = {
    passportSession
}