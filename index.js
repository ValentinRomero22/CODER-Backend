const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoConnect = require('./utils/mongoConnect')
const socketConfig = require('./config/socketConfig')
const { passportSession } = require('./middlewares/passportSession')
const { viewEngineHandlebars } = require('./middlewares/viewEngineHandlebars')
const { infoLogger, errorLogger } = require('./utils/winstonLogger')
const { PORT } = require('./config/config')
const {
    productRouter,
    cartRouter,
    loginRouter,
    logoutRouter,
    signupRouter,
    orderRouter,
    userRouter,
    indexRouter,
    messageRouter,
    notFoundRouter
} = require('./routes/main.routes')

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

app.use((req, res, next) => {
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

app.use('/public', express.static(__dirname + '/public'))

mongoConnect()
passportSession(app)

socketConfig(io)

viewEngineHandlebars(app, express, __dirname)

app.use('/', indexRouter)
app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)
app.use('/', orderRouter)
app.use('/', userRouter)
app.use('/', messageRouter)
app.use('*', notFoundRouter)

httpServer.listen(PORT, () => infoLogger.info(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => errorLogger.error('Server error'))