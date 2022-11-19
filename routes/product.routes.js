const { Router } = require('express')
const productController = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/middlewareFunctions')

const productsRouter = Router()

productsRouter.get('/', isAuthenticated, productController.getAllProducts)

productsRouter.get('/:id', isAuthenticated, productController.getProductById)

productsRouter.post('/', isAuthenticated, productController.saveNewProduct)

productsRouter.put('/:id', isAuthenticated, productController.updateProduct)

productsRouter.delete('/:id', isAuthenticated, productController.deleteProduct)

module.exports = productsRouter