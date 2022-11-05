const { Router } = require('express')
const { isAuthenticated } = require('../middlewares/functions')

const logoutRouter = Router()

logoutRouter.get('/logout', isAuthenticated, (req, res) =>{
    const user = req.session['logged'].user

    req.session.destroy((error) =>{
        if(error) return res.status(500).render('pages/logout', { error: true })

        res.status(200).render('pages/logout', { user })
    })
})

module.exports = logoutRouter