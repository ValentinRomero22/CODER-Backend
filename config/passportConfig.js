const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const Users = require('../models/user')
const { createHash, isValidPassword } = require('../utils/bcryptPassword')
const { infoLogger, errorLogger } = require('../utils/winstonLogger')

const passportLogin = {
    localStrategy: new LocalStrategy((username, password, done) => {
        Users.findOne({ username }, (error, user) => {
            if (error) {
                errorLogger.error(`Error login ${error}`)
                return done(error)
            }

            if (!user) {
                errorLogger.error(`Error usuario ${user} no encontrado`)
                return done(null, false)
            }

            if (!isValidPassword(password, user)) {
                errorLogger.error(`Password ${password} incorrecta`)
                return done(null, false)
            }

            return done(null, user)
        })
    })
}

const passportSignup = {
    localStrategy: new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            Users.findOne({ username: username }, function (error, user) {
                if (error) {
                    errorLogger.error(`Error login ${error}`)
                    return done(error)
                }

                if (user) {
                    errorLogger.error(`El usuario ${user} ya existe`)
                    return done(null, false)
                }

                const newUser = { username: username, password: createHash(password) }

                Users.create(newUser, (error, userCreated) => {
                    if (error) {
                        errorLogger.error(`Error al guardar el usuario, error: ${error}`)
                        return done(error)
                    }

                    infoLogger.info('Usuario registrado correctamente')
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