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
    try{
        product.getAll().then((response) =>{
            response 
            ? res.status(200).send({
                status: 200,
                message: 'Productos encontrados',
                data: response
            })
            : res.status(404).send({
                status: 404,
                message: 'No se han encontrado productos'
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

productsRouter.get('/:id', (req, res) => {
    try{
        const { id } = req.params;

        product.getById(id).then((response) =>{
            response
            ? res.status(200).send({
                status: 200,
                message: 'Producto encontrado',
                data: response
            })
            : res.status(404).send({ 
                status: 404,
                message: `No se encontró el producto con el id ${id}`
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

productsRouter.post('/', checkAdmin, (req, res) => {
    try{
        let name = req.body.name
        let description = req.body.description
        let code = req.body.code
        let image = req.body.image
        let price = parseFloat(req.body.price)
        let stock = parseInt(req.body.stock)

        const productToSave = { name, description, code, image, price, stock }

        product.save(productToSave).then((response) =>{
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

productsRouter.put('/:id', checkAdmin, (req, res) => {
    try{
        const { id } = req.params
        const { body } = req
        const { name, description, code, image, price, stock } = body

        const productToSave = { id, name, description, code, image, price, stock }

        product.update(productToSave).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Producto actualizado con éxito'
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

productsRouter.delete('/:id', checkAdmin, (req, res) => {
    try{
        const { id } = req.params

        product.delete(id).then((response) =>{
            res.status(200).send({
                status: 200,
                message: 'Producto eliminado con éxito'
            })
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

module.exports = ({ productsRouter, isAdmin })