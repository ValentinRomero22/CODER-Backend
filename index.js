const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const { engine } = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mongoConnect = require('./utils/mongoConnect')
const { passportSession } = require('./middlewares/passportSession')
const cluster = require('cluster')
const cpus = require('os')
const { infoLogger, warnlogger, errorLogger } = require('./utils/winstonLogger')
const { PORT, MODE } = require('./config/config')
const {
    productRouter,
    cartRouter,
    loginRouter, 
    logoutRouter, 
    signupRouter
} = require('./routes/main.routes')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {})

infoLogger.info(`MODO: ${MODE.toUpperCase()}`)

app.use((req, res, next) => {
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

//const MODE = 'fork'
const adminMail = 'valentinrq22@gmail.com'
const adminWhatsApp = '099856093'
//const cart = new Cart()

app.use('/public', express.static(__dirname + '/public'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', './views')

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'main.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
)

if (cluster.isPrimary && MODE.toUpperCase() == 'CLUSTER') {
    infoLogger.info(`Master ${process.pid} está corriendo`)

    for (let i = 0; i < cpus.cpus(); i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        cluster.fork()
        errorLogger.error(`Worker ${worker.process.pid} finalizó`)
    })
} else {
    httpServer.listen(PORT, () => infoLogger.info(`Servidor corriendo en el puerto ${PORT}`))
    infoLogger.info(`Worker ${process.pid} comenzado`)
    httpServer.on('error', () => errorLogger.error('Error del servidor'))
}

mongoConnect()
passportSession(app)

app.use('/', productRouter)
app.use('/', cartRouter)
app.use('/', loginRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', { ruta: req.originalUrl })
})