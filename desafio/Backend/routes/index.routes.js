const { Router } = require('express')
const { isAuthenticated } = require('../middlewares/functions')

const indexRouter = Router()

indexRouter.get('/', isAuthenticated, (req, res, next) =>{
    res.render('pages/main', { user: req.session.username })
})

module.exports = indexRouter