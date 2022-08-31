const Cart = require('../db/cart')

const express = require('express')
const { Router } = express

const cartRouter = Router()

const cart = new Cart('cart')

cartRouter.post('/', (req, res) =>{
    let products = req.body.products

    const c = { products };

    (async () =>{
        await cart.save(c).then((response) =>{
            res.json(response)
        })
    })()
})

cartRouter.delete('/:id', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await cart.deleteCart(id).then((response) =>{
            res.json(response)
        })
    })()
})

cartRouter.get('/:id/productos', (req, res) =>{
    const { id } = req.params;

    (async () =>{
        await cart.getProductsByCart(id).then((response) =>{
            res.json(response)
        })
    })()
})

cartRouter.post('/:id/productos', (req, res) =>{
    const { id } = req.params
    const { name, timestamp, description, code, image, price, stock } = req.body

    const product = { id: req.body.id, timestamp, name, description, code, image, price, stock };

    (async () =>{
        await cart.addToCart(id, product).then((response) =>{
            res.json(response)
        })
    })()
})

cartRouter.delete('/:id/productos/:id_prod', (req, res) =>{
    const { id, id_prod } = req.params;

    (async () =>{
        await cart.deleteProductOnCart(id, id_prod).then((response) =>{
            res.json(response)
        })
    })()
})

module.exports = cartRouter