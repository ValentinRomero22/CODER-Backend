import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { loginRouter, productsRouter, homeRouter } from './routes/main.routes.js'
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
            mongoOptions: { useNewUrlParser: true, useUniFiedTopology: true }
        }),
        secret: 'top secret',
        cookie: { maxAge: 600000 },
        resave: false,
        saveUninitialized: false,
    })
)

app.use((req, res, next) =>{
    req.session.touch()
    next()
})

app.use('/', productsRouter)
app.use('/', loginRouter)
app.use('/', homeRouter)

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


app.get('/logout', (req, res) =>{
    const user = req.session.user

    req.session.destroy((error) =>{
        if(error){
            return res.status(500).render('logout', { error: true })
        }

        res.status(200).render('logout', { name: user })
    })
})