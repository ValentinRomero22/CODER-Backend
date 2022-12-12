const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const {
    ProductRouter,
    LoginRouter,
    SignupRouter
} = require('./routes/main.routes')
const mongoConnect = require('./utils/mongoConnection')
const { passportSession } = require('./middlewares/passportSession')
const { PORT, MODE } = require('./config/config')
const cluster = require('cluster')
const cpus = require('os')
const { viewEngineHandlebars } = require('./middlewares/viewEngineHandlebars')
const { infoLogger, warnlogger, errorLogger } = require('./utils/winstonLogger')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {})
infoLogger.info(`MODO: ${MODE.toUpperCase()}`)

app.use('/public', express.static(__dirname + '/public'))

//BLOQUE FOREVER
if (cluster.isPrimary && MODE.toUpperCase() == "CLUSTER") {
    infoLogger.info(`Master ${process.pid} is running`)

    for (let i = 0; i < cpus.cpus().length; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork()
        //console.log(`Worker ${worker.process.pid} died`)
        errorLogger.error(`Worker ${worker.process.pid} died`)
    })
} else {
    httpServer.listen(PORT, () => infoLogger.info(`Server started on port ${PORT}`))
    infoLogger.info(`Worker ${process.pid} started`)
    httpServer.on('error', () => errorLogger.error('Server error'))
}

app.use((req, res, next) => {
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

viewEngineHandlebars(app, express, __dirname)

mongoConnect()
passportSession(app)

const productRouter = new ProductRouter()
const loginRouter = new LoginRouter()
const signupRouter = new SignupRouter()

app.use('/', productRouter.start())
app.use('/', loginRouter.startLogin())
app.use('/', loginRouter.startLogout())
app.use('/', signupRouter.start())

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', { ruta: req.originalUrl })
})