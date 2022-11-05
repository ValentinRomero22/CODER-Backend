const productsRouter = require('./products.routes')
const indexRouter = require('./index.routes')
const { logoutRouter, loginRouter } = require('./login-out.routes')
const signupRouter = require('./signup.routes')
const randomRouter = require('./random.routes')
const infoRouter = require('./info.routes')

module.exports = {
    productsRouter,
    indexRouter,
    logoutRouter,
    loginRouter,
    signupRouter,
    randomRouter,
    infoRouter
}