import { Router } from 'express'
import { login } from '../controllers/login.js'
import passport from 'passport'

const loginRouter = Router()
const logoutRouter = Router()

loginRouter.get('/login', login.get)

loginRouter.get('/errorLogin', login.error)

loginRouter.post(
    '/login', 
    passport.authenticate("login", { failureRedirect: '/errorLogin' }), 
    login.post
)

logoutRouter.get('/logout', (req, res) =>{
    if(req.isAuthenticated()){
        const name = req.session.username
        
        req.logout((error) =>{
            if(error) res.json(error)

        })
        
        res.render('logout', { name: name })
    } else{
        res.redirect('/login')
    }
})

export { loginRouter, logoutRouter }