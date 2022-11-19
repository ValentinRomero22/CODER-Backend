const isAuthenticated = (req, res, next) => {
    /* req.isAuthenticated()
    ? next()
    : res.redirect('/login') */
    next()
}

const viewEngine = (app, express) => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
}

module.exports = { isAuthenticated, viewEngine}