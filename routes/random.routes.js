import { Router } from "express"
import { random } from "../controllers/random.js"

const randomRouter = Router()

randomRouter.get('/api/random', random.get)

randomRouter.post('/api/random', random.post)

export default randomRouter