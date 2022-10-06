import { Router } from "express"
import { updateSessions, isLogged } from "../middlewares/functions.js"

const homeRouter = Router()

homeRouter.get('/', [isLogged, updateSessions], (req, res, next) =>{
    res.render('main', { user: req.session['logged'].user })
})

export default homeRouter