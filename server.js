import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { loginRouter, productsRouter, homeRouter, logoutRouter } from './routes/main.routes.js'
import MongooseMessege from './controllers/mongooseMessage.js'
import { normalizedMessages } from './utils/messageNormalize.js'
import { engine } from 'express-handlebars'
import session from 'express-session'

const app = express()
const PORT = process.env.port || 8080
const httpServer = createServer(app)
const io = new Server(httpServer, {})

import { fileURLToPath } from 'url'
import { dirname, format } from 'path'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
app.use('/public', express.static(__dirname + '/public'))

httpServer.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

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

import MongoStore from 'connect-mongo'
app.use(
    session({
        store: MongoStore.create({
            mongoUrl: 'mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: { 
                useNewUrlParser: true, 
                useUniFiedTopology: true 
            }
        }),
        cookie: { 
            secure: false,
            httpOnly: false,
            maxAge: 60000
        },
        resave: false,
        saveUninitialized: false,
        secret: 'top secret',
    })
)

app.use('/', productsRouter)
app.use('/', loginRouter)
app.use('/', homeRouter)
app.use('/', logoutRouter)

const messagesController = new MongooseMessege()

io.on('connection', async(socket) =>{
    const messages = await messagesController.getAll()
    const normalized = normalizedMessages(messages)

    io.sockets.emit('messages', normalized)

    socket.on('newMessage', async(clientMessage) =>{
        let message = JSON.parse(clientMessage)
        await messagesController.save(message)

        let allMessages = await messagesController.getAll({ sort: true })
        io.sockets.emit('messages', normalizedMessages(allMessages))
    })
})