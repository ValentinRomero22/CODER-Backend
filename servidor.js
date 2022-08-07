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

router.get('/', (req, res) =>{
    (async () => {
        await container.getAll().then((response) =>{
            const info = JSON.stringify(response) 

            info == '[]' ?
                res.json({ mensaje: "Aún no se han ingresado productos" }):
                res.json(response)
        })
    })()
})

router.get('/newproduct', (req, res) =>{
    res.sendFile(__dirname + '/public/index.html')
})

router.get('/:id', (req, res) =>{
    const { id } = req.params;
    
    (async () => {
        await container.getById(id).then((response) => {
            const found = response

            found ? 
                res.json(found) : 
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })()  
})

router.post('/', (req, res) =>{
    let title = req.body.title
    let price = parseInt(req.body.price)
    let thumbnail = req.body.thumbnail;

    const product = {
        title,
        price,
        thumbnail
    };

    (async () =>{
        await container.save(product)
        res.json({
            succes: 'ok',
            newProduct: product
        })
    })()
})

router.put('/:id', (req, res) =>{    
    const { id } = req.params;
    const { body } = req;
    const { title, price, thumbnail } = body;
    const product = {
        id,
        title,
        price,
        thumbnail
    };

    (async () =>{
        await container.update(product).then((response) => {
            response ?
                res.json({ success: "Se actualizó el producto" }):
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })()
})

router.delete('/:id', (req, res) =>{
    const { id } = req.params;

    (async () => {
        await container.deleteById(id).then((response) => {
            response ?
                res.json({ success: response }):
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })()
})

