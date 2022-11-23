const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const {
    productsRouter,
    indexRouter,
    loginRouter,
    logoutRouter,
    signupRouter,
    randomRouter,
    infoRouter
} = require('./routes/main.routes')
const { getAllMessages, saveNewMessage } = require('./controllers/messageController')
const { normalizedMessages } = require('./utils/messageNormalize')
const { engine } = require('express-handlebars')
const mongoConnect = require('./utils/mongoConnection')
const { passportSession } = require('./middlewares/passportSession')
const { PORT, MODE } = require('./config/config')
const cluster = require('cluster')
const cpus = require('os')
const { infoLogger, warnlogger, errorLogger } = require('./utils/winstonLogger')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {})
infoLogger.info(`MODO: ${MODE.toUpperCase()}`)

app.use('/public', express.static(__dirname + '/public'))

//BLOQUE FOREVER
if (cluster.isPrimary && MODE.toUpperCase() == "CLUSTER") {
    //console.log(`Master ${process.pid} is running`)
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
    //httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    httpServer.listen(PORT, () => infoLogger.info(`Server started on port ${PORT}`))
    //console.log(`Worker ${process.pid} started`)
    infoLogger.info(`Worker ${process.pid} started`)
    //httpServer.on('error', () => console.log('Server error'))
    httpServer.on('error', () => errorLogger.error('Server error'))
}

//BLOQUE PM2
/* httpServer.listen(PORT, () => infoLogger.info(`Server started on port ${PORT}`))
//console.log(`Worker ${process.pid} started`)
infoLogger.info(`Worker ${process.pid} started`)
//httpServer.on('error', () => console.log('Server error'))
httpServer.on('error', () => errorLogger.error('Server error')) */

app.use((req, res, next) => {
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

// la idea era configurar handlebars desde un middleware pero no pude 
//viewEngineHandlebars(app, express)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', './views')

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
)

mongoConnect()
passportSession(app)

app.use('/', productsRouter)
app.use('/', loginRouter)
app.use('/', indexRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)
app.use('/', randomRouter)
app.use('/', infoRouter)

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    res.render('pages/notFound', { ruta: req.originalUrl })
})

io.on('connection', async (socket) => {
    const messages = await getAllMessages()
    
    const normalized = normalizedMessages(messages)

    io.sockets.emit('messages', normalized)

    socket.on('newMessage', async (clientMessage) => {
        let message = JSON.parse(clientMessage)
        saveNewMessage(message)

        const allMessages = await getAllMessages()        
        io.sockets.emit('messages', normalizedMessages(allMessages))
    })
})