const Product = require('../db/product')

const express = require('express')
const { Router } = express

const productsRouter = Router()

const product = new Product('product')
const isAdmin = true

productsRouter.get('/', (req, res) => {
    (async () => {
        await product.getAll().then((response) => {
            const data = JSON.stringify(response)

            data == '[]' ?
                res.json({ error: "Aún no se han ingresado productos" }) :
                res.json(response)
        })
    })()
})

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    (async () => {
        await product.getById(id).then((response) => {
            const found = response

            found ?
                res.json(found) :
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })()
})

productsRouter.post('/', (req, res) => {
    if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    }

    let timestamp = req.body.timestamp
    let name = req.body.name
    let description = req.body.description
    let code = req.body.code
    let image = req.body.image
    let price = parseFloat(req.body.price)
    let stock = parseInt(req.body.stock)

    const p = { timestamp, name, description, code, image, price, stock };

    (async () => {
        await product.save(p).then((response) => {
            res.json({ result: response })
        })
    })()
})

productsRouter.put('/:id', (req, res) => {
    if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    }

    const { id } = req.params
    const { body } = req
    const { name, description, code, image, price, stock } = body

    const p = { id, name, description, code, image, price, stock };

    (async () => {
        await product.update(p).then((response) => {
            res.json({ result: response })
        })
    })()
})

productsRouter.delete('/:id', (req, res) => {
    if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    }

    const { id } = req.params;

    (async () => {
        await product.delete(id).then((response) => {
            res.json({ result: response })
        })
    })()
})

module.exports = ({ productsRouter, isAdmin })