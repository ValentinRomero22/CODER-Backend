/* import Cart from './db/cart'
import Product from './db/product' */

const Cart = require('./db/cart')
const Product = require('./db/product')

const express = require('express')
const { Router } = express

const app = express()
const productsRouter = Router()
const cartRouter = Router()

const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/products', productsRouter)
app.use('/api/cart', cartRouter)

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

const cart = new Cart('cart')
const product = new Product('product')

productsRouter.get('/', (req, res) =>{
    (async () =>{
        await product.getAll().then((response) =>{
            const data = JSON.stringify(response)

            data == '[]' ?
                res.json({ error: "Aún no se han ingresado productos" }) : 
                res.json(response)
        })
    })()
})

productsRouter.get('/:id', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await product.getById(id).then((response) =>{
            const found = response

            found ?
                res.json(found) : 
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })()
})

productsRouter.post('/', (req, res) =>{
    console.log(req);
    let timestamp = req.body.timestamp
    let name = req.body.name
    let description = req.body.description
    let code = req.body.code
    let image = req.body.image
    let price = parseFloat(req.body.price)
    let stock = parseInt(req.body.stock)

    const p = { timestamp, name, description, code, image, price, stock };
    
    (async () =>{
        await product.save(p).then((response) =>{
            res.json({ result: response })
        })
    })()
})

productsRouter.put('/:id', (req, res) =>{
    const { id } = req.params
    const { body } = req
    const { name, description, code, image, price, stock } = body

    const p = { id, name, description, code, image, price, stock };

    (async () =>{
        await product.update(p).then((response) =>{
            res.json({ result: response })
        })
    })()
})

productsRouter.delete('/:id', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await product.delete(id).then((response) =>{
            res.json({ result: response })
        })
    })()
})

cartRouter.post('/', (req, res) =>{
    let timestamp = req.body.timestamp
    let products = req.body.products

    const c = { timestamp, products };

    (async () =>{
        await cart.save(c).then((response) =>{
            res.json({ result: response })
        })
    })()
})

cartRouter.delete('/:id', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await cart.deleteCart(id).then((response) =>{
            res.json({ result: response })
        })
    })()
})

cartRouter.get('/:id/productos', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await cart.getProductsByCart(id).then((response) =>{
            res.json({ result: response })
        })
    })()
})

cartRouter.post('/:id/productos', (req, res) =>{
    const { id } = req.params
    const productId = req.body.id
    const { name, description, code, image, price, stock } = req.body

    const product = { productId, name, description, code, image, price, stock };

    (async () =>{
        await cart.addToCart(id, product).then((response) =>{
            res.json({ result: response })
        })
    })()
})

cartRouter.delete('/:id/productos/:id_prod', (req, res) =>{
    const { id, id_prod } = req.params;

    (async () =>{
        await cart.deleteProductOnCart(id, id_prod).then((response) =>{
            res.json({ result: response })
        })
    })()
})