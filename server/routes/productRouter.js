const { product: Product } = require('../daos/main')

const express = require('express')
const { Router } = express

const productsRouter = Router()

const product = new Product()
const isAdmin = true

const checkAdmin = (req, res, next) =>{
    if(!isAdmin){
        return res.status(403).send({ error: 'Acceso no autorizado' })
    } else{
        return next()
    }
}

productsRouter.get('/', (req, res) => {
    product.getAll().then((response) =>{
        res.json(response)
    })
    /* (async () => {
        await product.getAll().then((response) => {
            const data = JSON.stringify(response)

            data == '[]' ?
                res.json({ error: "Aún no se han ingresado productos" }) :
                res.json(response)
        })
    })() */
})

productsRouter.get('/:id', (req, res) => {
    const { id } = req.params;

    product.getById(id).then((response) =>{
        response
        ? res.json(response)
        : res
            .status(400)
            .json({ error: `No se encontró el producto con el id ${id}` })
    })

    /* (async () => {
        await product.getById(id).then((response) => {
            const found = response

            found ?
                res.json(found) :
                res.json({ error: `No se encontró el producto con el id ${id}` })
        })
    })() */
})

productsRouter.post('/', checkAdmin, (req, res) => {
    /* if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    } */

    //let timestamp = req.body.timestamp
    let timestamp = Date.now()
    let name = req.body.name
    let description = req.body.description
    let code = req.body.code
    let image = req.body.image
    let price = parseFloat(req.body.price)
    let stock = parseInt(req.body.stock)

    const productToSave = { timestamp, name, description, code, image, price, stock }

    product.save(productToSave).then((response) =>{
        res.json(response)
    })

    /* (async () => {
        await product.save(p).then((response) => {
            res.json({ result: response })
        })
    })() */
})

productsRouter.put('/:id', checkAdmin, (req, res) => {
    /* if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    } */

    const { id } = req.params
    const { body } = req
    const { name, description, code, image, price, stock } = body

    const productToSave = { id, name, description, code, image, price, stock }

    product.update(productToSave).then((response) =>{
        res.json(response)
    })

    /* (async () => {
        await product.update(p).then((response) => {
            res.json({ result: response })
        })
    })() */
})

productsRouter.delete('/:id', checkAdmin, (req, res) => {
    /* if(!isAdmin){
        return res.send({ error: 'Acceso no autorizado' })        
    } */

    const { id } = req.params

    product.delete(id).then((response) =>{
        res.json(response)
    })

    /* (async () => {
        await product.delete(id).then((response) => {
            res.json({ result: response })
        })
    })() */
})

module.exports = ({ productsRouter, isAdmin })