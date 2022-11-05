const { Router } = require('express')
const { info } = require('../controllers/infoController')
const { isAuthenticated } = require('../middlewares/functions')

const infoRouter = Router()

infoRouter.get('/info', isAuthenticated, info.get)

module.exports = infoRouter