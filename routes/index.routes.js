import { Router } from "express"
import { updateSessions, isLogged } from "../middlewares/functions.js"

const indexRouter = Router()

/* homeRouter.get('/', [isLogged, updateSessions], (req, res, next) =>{
    res.render('main', { user: req.session['logged'].user })
}) */

indexRouter.get('/', (req, res, next) =>{
    if(req.isAuthenticated()){
        res.render('main', { user: req.session.username })
    } else{
        res.redirect('/errorLogin')
    }
})

export default indexRouter