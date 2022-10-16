import { Router } from "express"
import { signup } from "../controllers/signup.js"
import passport from "passport"

const signupRouter = Router()

signupRouter.get('/signup', signup.get)

signupRouter.get('/errorSignup', signup.error)

signupRouter.post(
    '/signup',
    passport.authenticate("signup", { failureRedirect: '/errorSignup' }),
    signup.post
)

export default signupRouter