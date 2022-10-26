//import { Router } from "express"
const { Router } = require('express')
//import { signup } from "../controllers/signup.js"
const { signup } = require('../controllers/signup')
//import passport from "passport"
const passport = require('passport')

const signupRouter = Router()

signupRouter.get('/signup', signup.get)

signupRouter.get('/errorSignup', signup.error)

signupRouter.post(
    '/signup',
    passport.authenticate("signup", { failureRedirect: '/errorSignup' }),
    signup.post
)

//export default signupRouter
module.exports = signupRouter