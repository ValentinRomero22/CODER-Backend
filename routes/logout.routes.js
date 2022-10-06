import { Router } from 'express'
import { isLogged } from '../middlewares/functions.js'

const logoutRouter = Router()

logoutRouter.get('/logout', isLogged, (req, res) =>{
    const user = req.session['logged'].user

    req.session.destroy((error) =>{
        if(error) return res.status(500).render('logout', { error: true })

        res.status(200).render('logout', { user })
    })
})

export default logoutRouter