const express = require('express')
const http = require('http')
const mongoConnect = require('./utils/mongoConnect')
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
    indexRouter
} = require('./routes/main.routes')

const app = express()
const httpServer = http.createServer(app)

app.use((req, res, next) => {
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

app.use('/public', express.static(__dirname + '/public'))

mongoConnect()
passportSession(app)
viewEngineHandlebars(app, express, __dirname)

app.use('/', indexRouter)
app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)
app.use('/', orderRouter)
app.use('/', userRouter)

httpServer.listen(PORT, () => infoLogger.info(`Servidor corriendo en el puerto ${PORT}`))
httpServer.on('error', () => errorLogger.error('Server error'))

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', {
        ruta: req.originalUrl,
        user: req.user
    })
})