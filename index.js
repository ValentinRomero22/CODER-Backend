const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const mongoConnect = require('./utils/mongoConnect')
const socketConfig = require('./config/socketConfig')
const { passportSession } = require('./middlewares/passportSession')
const { viewEngineHandlebars } = require('./middlewares/viewEngineHandlebars')
const { infoLogger, warnlogger, errorLogger } = require('./utils/winstonLogger')
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
    messageRouter
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

/* const session = require('express-session')
const passport = require('passport')

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(passportSession))
io.use(wrap(passport.initialize()))
io.use(wrap(passport.session()))

io.use((socket, next) => {
    if (socket.request.user) {
        console.log('if ok')
        //next()
    } else {
        next(() => console.log('io.use => next'))
    }
}) */

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

httpServer.listen(PORT, () => infoLogger.info(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => errorLogger.error('Server error'))

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', {
        ruta: req.originalUrl,
        user: req.user
    })
})