const Contenedor = require("./contenedor")
const express = require('express')
const { Router } = express

const container = new Contenedor("productos")

const app = express()
const router = Router()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', router)
app.use('/public', express.static(__dirname + '/public'))

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error ${error}`))

app.set('view engine', 'pug')
app.set('views', './views/layouts/')

router.get('/', (req, res) =>{
    (async () => {
        await container.getAll().then((response) =>{
            JSON.stringify(response) != '[]' ?
                res.render('products', { products: response, exists: true }) :
                res.render('products', { exists: false })
        })
    })()
})

router.get('/form', (req, res) =>{
    res.render('newProduct')
})

router.post('/form', (req, res) =>{
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
        res.render('newProduct', { message: 'Producto agregado con éxito' })
    })()
})