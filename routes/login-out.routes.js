import { Router } from 'express'
import { login } from '../controllers/login.js'
import { returnLogin, saveSession } from '../middlewares/functions.js'
import passport from 'passport'
//import logoutRouter from './logout.routes.js'

const loginRouter = Router()
const logoutRouter = Router()

/* loginRouter.get('/login', returnLogin, login.get)
loginRouter.post('/login', saveSession, login.post) */

/* logoutRouter.get('/logout', isLogged, (req, res) =>{
    const user = req.session['logged'].user

    req.session.destroy((error) =>{
        if(error) return res.status(500).render('logout', { error: true })

        res.status(200).render('logout', { user })
    })
}) */

loginRouter.get('/login', login.get)

loginRouter.get('/errorLogin', login.error)

loginRouter.post(
    '/login', 
    passport.authenticate("login", { failureRedirect: '/errorLogin' }), 
    login.post
)

logoutRouter.get('/logout', (req, res) =>{
    if(req.isAuthenticated()){
        const name = req.session.user
        req.logout((error) =>{
            if(error) res.json(error)

            res.status(200).render('logout', { name })
        })
    } else{
        res.redirect('/login')
    }
})

export { loginRouter, logoutRouter }