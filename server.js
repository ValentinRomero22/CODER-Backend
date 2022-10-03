import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import productsRouter from './routes/products.routes.js'
import MongooseMessege from './controllers/mongooseMessage.js'
import { normalizedMessages } from './utils/messageNormalize.js'
import { engine } from 'express-handlebars'

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

httpServer.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado...'))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use('/public', express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine( 
    'hbs',
    engine({
        extname: 'hbs', 
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
)

const messagesController = new MongooseMessege()

app.get('/', (req, res) =>{
    res.render('main', { root: __dirname + '/public' })
})

app.use('/api/productos-test', productsRouter)

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