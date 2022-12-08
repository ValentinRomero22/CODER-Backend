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

/* mongoConnect() */
/* passportSession(app) */

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