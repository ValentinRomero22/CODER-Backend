const Contenedor = require("./contenedor")
const express = require('express')
const { Router } = express
const { engine } = require('express-handlebars')

const container = new Contenedor("productos")

const app = express()
const router = Router()

const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer)

httpServer.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado...'))

app.use(express.urlencoded({ extended: true }))
app.use('/api/products', router)
app.use('/public', express.static(__dirname + '/public'))

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

let chat = []
let products = []

async function getProducts(){
    await container.getAll().then((response) =>{
        products = response
        return products
    })
}

/* async function saveProduct(product){
    await container.save(product)
} */

getProducts()

router.get('/', (req, res) =>{
    res.render('products', { root: __dirname + '/public' })
})

io.on('connection', (socket) =>{
    chat.push('Se unió al chat ' + socket.id)
    io.sockets.emit('chatList', chat)
    io.sockets.emit('productList', products)

    socket.on('chatData', (data) =>{
        chat.push(data)
        io.sockets.emit('chatList', chat)
    })

    socket.on('productData', (data) =>{        
        const index = products.map(i => i.id).sort((a, b) =>{
            return a - b
        })

        const id = index[index.length - 1] + 1
        const product = { id, ...data }

        //saveProduct(product)
        products.push(product)
        io.sockets.emit('productList', products)
    })
})