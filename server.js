import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { router } from "./routes/products.routes.js"

import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(__filename)

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer)

httpServer.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado...'))

import { engine } from 'express-handlebars'
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

app.get('/', (req, res) =>{
    res.render('main', { root: __dirname + '/public' })
})

socketModel(io)

app.use('/api/productos-test', router)

io.on('connection', async(socket) =>{
    let messages = await messagesController.getAll()
    io.sockets.emit('messages', normalizedMessages(messages))

    socket.on('newMessage', async(clientMessage) =>{
        console.log('aca')
        let message = JSON.parse(clientMessage)
        await messagesController.save(message)

        let allMessages = await messagesController.getAll({ sort: true })
        io.sockets.emit('messages', normalizedMessages(allMessages))
    })
})