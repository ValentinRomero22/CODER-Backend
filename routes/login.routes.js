import { Router } from 'express'
import { login } from '../controllers/login.js'

const loginRouter = Router()

loginRouter.get('/', login.get)
loginRouter.post('/', login.post)

export default loginRouter