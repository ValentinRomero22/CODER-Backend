const productRouter = require('./product.routes')
const cartRouter = require('./cart.routes')
const { loginRouter, logoutRouter } = require('./login-out.routes')
const signupRouter = require('./signup.routes')

module.exports = {
    productRouter,
    cartRouter,
    loginRouter, 
    logoutRouter, 
    signupRouter
}