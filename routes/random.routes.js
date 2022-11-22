const { Router } = require('express')
const { random } = require('../controllers/randomController')
const { isAuthenticated } = require('../middlewares/functions')

const randomRouter = Router()

randomRouter.get('/api/random', isAuthenticated, random.get)

randomRouter.post('/api/random', isAuthenticated, random.post)

module.exports = randomRouter