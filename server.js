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

app.use('/api/productos-test', router)

io.on('connection', async(socket) =>{
    /* await createTables()

    const products = await productContainer.getAll()
    const chat = await chatContainer.getAll()
    
    const text = {
        user: socket.id, 
        message: 'Se unió al chat',
        dateTime: Date.now()
    }

    await chatContainer.save(text)
    
    io.sockets.emit('chatList', chat)
    io.sockets.emit('productList', products) */

    socket.on('chatData', async(data) =>{
        /* const added = await chatContainer.save(data)
        const chat = await chatContainer.getAll()

        added 
        ? io.sockets.emit('chatList', chat)
        : console.log('Error al agregar el chat')

        chat.push(data) */
    })

    socket.on('productData', async(data) =>{
        /* const added = await productContainer.save(data)
        const products = await productContainer.getAll()

        added 
        ? io.sockets.emit('productList', products) 
        : console.log('Error al agregar el producto') */
    })
})