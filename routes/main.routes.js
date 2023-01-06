const productRouter = require('./product.routes')
const cartRouter = require('./cart.routes')
const userRouter = require('./user.routes')
const orderRouter = require('./order.routes')
const { loginRouter, logoutRouter } = require('./login-out.routes')
const signupRouter = require('./signup.routes')
const indexRouter = require('./index.routes')
const messageRouter = require('./message.routes')

module.exports = {
    productRouter,
    cartRouter,
    userRouter,
    loginRouter,
    logoutRouter,
    signupRouter,
    orderRouter,
    indexRouter,
    messageRouter
}