const Contenedor = require("./contenedor")
const express = require('express')
const { Router } = express
const { engine } = require('express-handlebars')
const { response } = require("express")

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

router.get('/', (req, res) =>{
    (async () => {
        await container.getAll().then((response) =>{
            JSON.stringify(response) != '[]' ?
                res.render('products', { products: response, exists: true }) :
                res.render('products', { exists: false })
        })
    })()
})

router.post('/', (req, res) =>{
    let title = req.body.title
    let price = parseFloat(req.body.price)
    let thumbnail = req.body.thumbnail;

    const product = {
        title,
        price,
        thumbnail
    };

    (async () =>{
        await container.save(product)
        await container.getAll().then((response) =>{
                res.render('products', { products: response, exists: true, message: 'Producto agregado con éxito!' })
        })
    })()
})

io.on('connection', (socket) =>{
    chat.push('Se unió al chat ' + socket.id)
    io.sockets.emit('chatList', chat)

    socket.on('chatData', (data) =>{
        chat.push(data)
        //console.log(chat)
        io.sockets.emit('chatList', chat)
    })

    socket.on('productData', (data) =>{
        (async () =>{
            await container.save(data)
            await container.getAll().then((response =>{
                io.sockets.emit('productList', response)
            }))
        })()
    })
})