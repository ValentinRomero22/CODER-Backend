import { Router } from "express"
import { login } from "../controllers/login.js"

const homeRouter = Router()

homeRouter.get('/', login.auth, (req, res, next) =>{
    res.render('main', { name: req.session.user })
})

export default homeRouter