const productsRouter = require('./product.routes')
const { infoLogger } = require('../utils/winstonLogger')

const routes = (app) => {
    app.use((req, res, next) => {
        infoLogger.info({ URL: req.originalUrl, method: req.method })
        next()
    })

    /* app.use('/', signupRouter)
    app.use('/', loginOutRouter) */
    app.use('/', productsRouter)
    /* app.use('/', cartRouter)
    app.use('/', checkoutRouter) */
}

module.exports = routes