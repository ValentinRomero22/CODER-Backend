const { cart: Cart } = require('../daos/main')

const express = require('express')
const { Router } = express

const cartRouter = Router()

const cart = new Cart()

cartRouter.post('/', (req, res) =>{ //OK
    try{
        cart.save().then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Carrito agregado con éxito',
                data: response
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

cartRouter.delete('/:id', (req, res) =>{ //OK
    try{
        const { id } = req.params;

        cart.deleteCart(id).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Carrito eliminado con éxito',
                data: response
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

cartRouter.get('/:id/productos', (req, res) =>{ //OK
    try{
        const { id } = req.params;

        cart.getProductsByCart(id).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Productos encontrados',
                data: response
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

cartRouter.post('/:id/productos', (req, res) =>{ //OK
    try{
        const { id } = req.params
        const { name, timestamp, description, code, image, price, stock } = req.body

        const product = { id: req.body.id, timestamp, name, description, code, image, price, stock }

        cart.addToCart(id, product).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Producto agregado con éxito',
                data: response
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

cartRouter.delete('/:id/productos/:idProd', (req, res) =>{ //REVISAR FILTRO DE PRODUCTS.ID
    try{
        const { id, idProd } = req.params

        cart.deleteProductOnCart(id, idProd).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Producto eliminado con éxito',
                data: response
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

module.exports = cartRouter