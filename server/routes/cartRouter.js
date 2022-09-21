const { cart: Cart, product: Product } = require('../daos/main')

const express = require('express')
const { Router } = express

const cartRouter = Router()

const cart = new Cart()
const product = new Product()

cartRouter.post('/', (req, res) =>{
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

cartRouter.delete('/:id', (req, res) =>{
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

cartRouter.get('/:id/productos', (req, res) =>{
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

cartRouter.post('/:id/productos/:idProd', async(req, res) =>{
    try{
        const { id, idProd } = req.params

        const productToAdd = await product.getById(idProd)

        cart.addToCart(id, productToAdd).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Producto agregado con éxito'
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

cartRouter.delete('/:id/productos/:idProd', async(req, res) =>{
    try{
        const { id, idProd } = req.params
        const productToDelete = await product.getById(idProd)

        cart.deleteProductOnCart(id, productToDelete).then((response) =>{
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