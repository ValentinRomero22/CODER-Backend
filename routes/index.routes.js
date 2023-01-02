const { Router } = require('express')
const { isAuthenticated } = require('../middlewares/functions')

const indexRouter = Router()

indexRouter.get('/', isAuthenticated, (req, res) => {
    res.redirect('/productos')
})

module.exports = indexRouter