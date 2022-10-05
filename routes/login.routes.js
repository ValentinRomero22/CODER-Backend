import { Router } from 'express'
import { login } from '../controllers/login.js'

const loginRouter = Router()

loginRouter.get('/login', login.get)
loginRouter.post('/login', login.post)

export default loginRouter