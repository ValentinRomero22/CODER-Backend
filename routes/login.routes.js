import { Router } from 'express'
import { login } from '../controllers/login.js'
import { returnLogin, saveSession } from '../middlewares/functions.js'

const loginRouter = Router()

loginRouter.get('/login', returnLogin, login.get)
loginRouter.post('/login', saveSession, login.post)

export default loginRouter