const { Router } = require('express')
const { getRandom, postRandom } = require('../controllers/randomController')
const { isAuthenticated } = require('../middlewares/functions')

const randomRouter = Router()

randomRouter.get('/api/random', isAuthenticated, getRandom)

randomRouter.post('/api/random', isAuthenticated, postRandom)

module.exports = randomRouter