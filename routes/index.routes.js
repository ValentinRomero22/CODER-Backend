import { Router } from "express"
import { isAuthenticated } from "../middlewares/functions.js"

const indexRouter = Router()

indexRouter.get('/', isAuthenticated, (req, res, next) =>{
    res.render('pages/main', { user: req.session.username })
})

export default indexRouter