const Container = require("./container")
const { createTables } = require("./knex")
const knex = require("knex")

const express = require('express')
const app = express()
const { Router } = express
const router = Router()

const { options: SQLite } = require("./options/sqlite")
const { options: MySql } = require("./options/mdb")
const chatContainer = new Container(knex(SQLite), 'chat')
const productContainer = new Container(knex(MySql), 'product')

const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer)

httpServer.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado...'))

const { engine } = require('express-handlebars')
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use('/api/products', router)
app.use('/public', express.static(__dirname + '/public'))

app.engine(
    'hbs',
    engine({
        extname: 'hbs', 
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
)

router.get('/', (req, res) =>{
    res.render('products', { root: __dirname + '/public' })
})

io.on('connection', async(socket) =>{
    await createTables()

    const products = await productContainer.getAll()
    const chat = await chatContainer.getAll()
    
    const text = {
        user: socket.id, 
        message: 'Se unió al chat',
        dateTime: Date.now()
    }

    await chatContainer.save(text)
    
    //chat.push('Se unió al chat ' + socket.id)
    io.sockets.emit('chatList', chat)
    io.sockets.emit('productList', products)

    socket.on('chatData', async(data) =>{
        const added = await chatContainer.save(data)
        const chat = await chatContainer.getAll()

        added ?
            io.sockets.emit('chatList', chat):
            console.log('Error al agregar el chat')

        chat.push(data)
    })

    socket.on('productData', async(data) =>{
        const added = await productContainer.save(data)
        const products = await productContainer.getAll()

        added ?
            io.sockets.emit('productList', products) :
            console.log('Error al agregar el producto')
    })
})