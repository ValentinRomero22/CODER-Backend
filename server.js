const Contenedor = require("./contenedor")
const express = require('express')
const { Router } = express
const { engine } = require('express-handlebars')

const container = new Contenedor("productos")

const app = express()
const router = Router()
//const PORT = process.env.PORT || 8080

const httpServer = require("http").createServer(app)
const io = require("socket.io")(httpServer)

httpServer.listen(process.env.PORT || 8080, () => console.log('Servidor iniciado...'))

app.use(express.urlencoded({ extended: true }))
app.use('/api/products', router)
app.use('/public', express.static(__dirname + '/public'))

/* const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
}) */

//server.on('error', error => console.log(`Error ${error}`))

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

getProducts()

router.get('/', (req, res) =>{
    JSON.stringify(products) != '[]' ?
        res.render('products', { products: products, exists: true }) :
        res.render('products', { exists: false })
})

io.on('connection', (socket) =>{
    console.log('connection');
    chat.push('Se unió al chat ' + socket.id)
    io.sockets.emit('chatList', chat)

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

        products.push(product)
        console.log(product)
        io.sockets.emit('productList', product)
    })
})