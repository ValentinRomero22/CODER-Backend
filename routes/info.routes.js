import { Router } from "express"
import { info } from "../controllers/infoController.js"
import { isAuthenticated } from "../middlewares/functions.js"

const infoRouter = Router()

infoRouter.get('/info', isAuthenticated, info.get)

export default infoRouter