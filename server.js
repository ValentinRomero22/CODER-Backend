const Container = require("./container")
const { createTables } = require("./knex")

/* const { options: SQLite } = require("./options/sqlite")
const { options: MySql } = require("./options/mdb") */

const express = require('express')
const app = express()
const { Router } = express
const router = Router()

//const container = new Contenedor("productos")
/* const chatContainer = new Container(SQLite, 'chat')
const productContainer = new Container(MySql, 'product') */

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

/* let chat = []
let products = [] */

/* async function getProducts(){
    await container.getAll().then((response) =>{
        products = response
        return products
    })
} */

/* async function saveProduct(product){
    await container.save(product)
} */

//getProducts()

router.get('/', (req, res) =>{
    res.render('products', { root: __dirname + '/public' })
})

io.on('connection', async(socket) =>{
    (async () => {
        await createTables()
    })();

    /* productContainer.createProductTable('product')
    chatContainer.createChatTable('chat') */

    /* const products = await productContainer.getAll()
    const chat = await chatContainer.getAll() */
    
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
        
        /* verificar el tema de los id
        const index = products.map(i => i.id).sort((a, b) =>{
            return a - b
        }) 
        const id = index[index.length - 1] + 1
        const product = { id, ...data }*/


        //saveProduct(product)
        //products.push(product)
    })
})