import { Router } from "express"
import { random } from "../controllers/randomController.js"
import { isAuthenticated } from "../middlewares/functions.js"

const randomRouter = Router()

randomRouter.get('/api/random', isAuthenticated, random.get)

randomRouter.post('/api/random', random.post)

export default randomRouter