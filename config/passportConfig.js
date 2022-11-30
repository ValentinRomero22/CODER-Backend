const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const Users = require('../models/userModel')
const { createHash, isValidPassword } = require('../utils/bcryptPassword')
const { infoLogger, errorLogger } = require('../utils/winstonLogger')

const passportLogin = {
    localStrategy: new LocalStrategy((email, password, done) => {
        Users.findOne({ email }, (error, user) => {
            if (error) {
                errorLogger.error(`Error login ${error}`)
                return done(error)
            }

            if (!user) {
                errorLogger.error(`No se encontró el usuario ${email}`)
                return done(null, false)
            }

            if (!isValidPassword(password, user)) {
                errorLogger.error(`Contraseña ${password} incorrecta`)
                return done(null, false)
            }

            return done(null, user)
        })
    })
}

const passportSignup = {
    localStrategy: new LocalStrategy(
        { passReqToCallback: true },
        (req, email, password, done) => {
            Users.findOne({ email: email }, function (error, user) {
                if (error) {
                    errorLogger.error(`Error de signup ${error}`)
                    return done(error)
                }

                if (user) {
                    errorLogger.error(`El usuario ${user.email} ya existe`)
                    return done(null, false)
                }

                const newUser = {
                    username: req.body.name,
                    password: createHash(password),
                    /* email: email,
                    address: 'direccion',
                    age: 27,
                    phone: '099099099',
                    avatar: 'http://imagendemail.com',
                    isAdmin: false, */
                    email: email,
                    address: req.body.address,
                    age: req.body.age,
                    phone: req.body.phone,
                    image: req.file.filename,
                    isAdmin: false
                }

                Users.create(newUser, (error, userCreated) => {
                    if (error) {
                        errorLogger.error(`Error al guardar el usuario, error: ${error}`)
                        return done(error)
                    }

                    infoLogger.info(`Usuario ${newUser.email} registrado correctamente`)
                    return done(null, userCreated)
                })
            })
        }
    )
}

const serializeUser = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
}

const deserializeUser = () => {
    passport.deserializeUser((id, done) => {
        Users.findById(id, done)
    })
}

module.exports = {
    passportLogin,
    passportSignup,
    serializeUser,
    deserializeUser
}