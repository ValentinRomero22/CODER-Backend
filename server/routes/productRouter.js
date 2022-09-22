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
            if(response.length == 0){
                res.status(404).send({
                    status: 404,
                    message: 'No se han encontrado productos'
                })
            } else if(response.error){
                res.status(500).send({
                    status: 500,
                    message: 'Se produjo un error inesperado'
                })
            } else{
                res.status(200).send({
                    status: 200,
                    message: 'Productos encontrados',
                    data: response
                })
            }            
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
        const { id } = req.params

        product.getById(id).then((response) =>{
            if(response.length == 0){
                res.status(404).send({ 
                    status: 404,
                    message: `No se encontró el producto con el id ${id}`
                })
            } else if(response.error){
                res.status(500).send({
                    status: 500,
                    message: 'Se produjo un error inesperado'
                })
            } else{
                res.status(200).send({
                    status: 200,
                    message: 'Producto encontrado',
                    data: response
                })
            }
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
        const { name, description, code, image } = req.body
        if(name.trim() == '' || description.trim() == '' || code.trim() == '' || image.trim() == ''){
            res.status(400).send({
                status: 400,
                message: 'Los datos ingresados no son válidos'
            })

            return
        }

        const price = parseFloat(req.body.price)
        const stock = parseInt(req.body.stock)
        if(isNaN(price) || isNaN(stock)){
            res.status(400).send({
                status: 400,
                message: 'Los datos ingresados no son válidos'
            })

            return
        }

        const productToSave = { name, description, code, image, price, stock }

        product.save(productToSave).then((response) =>{
            if(response){
                if(response.error){
                    res.status(500).send({
                        status: 500,
                        message: 'Se produjo un error inesperado'
                    })
                }
            } else{
                res.status(200).send({
                    status: 200,
                    message: 'Producto agregado con éxito'
                })
            }
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
        const { name, description, code, image } = req.body
        if(name.trim() == '' || description.trim() == '' || code.trim() == '' || image.trim() == ''){
            res.status(400).send({
                status: 400,
                message: 'Los datos ingresados no son válidos'
            })

            return
        }

        const price = parseFloat(req.body.price)
        const stock = parseInt(req.body.stock)
        if(isNaN(price) || isNaN(stock)){
            res.status(400).send({
                status: 400,
                message: 'Los datos ingresados no son válidos'
            })

            return
        }

        const productToSave = { id, name, description, code, image, price, stock }

        product.update(productToSave).then((response) =>{
            if(response){
                if(response.error){
                    res.status(500).send({
                        status: 500,
                        message: 'Se produjo un error inesperado'
                    })
                }
            } else{
                res.status(200).send({
                    status: 200,
                    message: 'Producto actualizado con éxito'
                })
            }            
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
            if(response){
                if(response.error){
                    res.status(500).send({
                        status: 500,
                        message: 'Se produjo un error inesperado'
                    })
                }
            } else{
                res.status(200).send({
                    status: 200,
                    message: 'Producto eliminado con éxito'
                })
            }            
        })
    } catch(error){
        res.status(500).send({
            status: 500,
            message: 'Se produjo un error inesperado'
        })
    }
})

module.exports = ({ productsRouter, isAdmin })