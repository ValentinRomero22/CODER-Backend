const { Router } = require('express')
const { isAuthenticated } = require('../middlewares/functions')
const { warnlogger } = require('../utils/winstonLogger')

const notFoundRouter = Router()

notFoundRouter.get('', isAuthenticated, (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', {
        ruta: req.originalUrl,
        user: req.user
    })
})

module.exports = notFoundRouter