const { Router } = require('express')
const productController = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/middlewareFunctions')

const productsRouter = Router()

productsRouter.get('/api', isAuthenticated, productController.getAllProducts)

productsRouter.get('/api/:id', isAuthenticated, productController.getProductById)

productsRouter.post('/api', isAuthenticated, productController.saveNewProduct)

productsRouter.put('/api/:id', isAuthenticated, productController.updateProduct)

productsRouter.delete('/api/:id', isAuthenticated, productController.deleteProduct)

module.exports = productsRouter