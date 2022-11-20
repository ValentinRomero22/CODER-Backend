const productService = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

const productController = {
    getAllProducts: (req, res) =>{
        productService.getAllProducts()
            .then((response) =>{
                res.status(response.status).json({
                    message: response.message,
                    data: response.data
                })
            })
            .catch((error) =>{
                errorLogger.error(`productController.js: getAllProducts(): ${error}`)
                res.status(500).json({
                    message: 'Error: Se produjo un error inesperado'
                })
            })
    },
    getProductById: (req, res) =>{
        productService.getProductById(req)
            .then((response) =>{
                res.status(response.status).json({
                    message: response.message,
                    data: response.data
                })
            })
            .catch((error) =>{
                errorLogger.error(`productController.js: getProductById(): ${error}`)
                res.status(500).send({
                    message: 'Error: Se produjo un error inesperado'
                })
            })
    },
    saveNewProduct: (req, res) =>{
        productService.saveNewProduct(req)
            .then((response) =>{
                res.status(response.status).json({
                    message: response.message
                })
            })
            .catch((error) =>{
                errorLogger.error(`productController.js: saveNewProduct(): ${error}`)
                res.status(500).send({
                    message: 'Error: Se produjo un error inesperado'
                })
            })
    },
    updateProduct: (req, res) =>{
        productService.updateProduct(req)
            .then((response) =>{
                res.status(response.status).json({
                    message: response.message
                })
            })
            .catch((error) =>{
                errorLogger.error(`productController.js: updateProduct(): ${error}`)
                res.status(500).send({
                    message: 'Error: Se produjo un error inesperado'
                })
            })
    },
    deleteProduct: (req, res) =>{
        productService.deleteProduct(req)
            .then((response) =>{
                res.status(response.status).json({
                    message: response.message
                })
            })
            .catch((error) =>{
                errorLogger.error(`productController.js: deleteProduct(): ${error}`)
                res.status(500).send({
                    message: 'Error: Se produjo un error inesperado'
                })
            })
    }
}

module.exports = productController