const { Router } = require('express')
const productController = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/functions')

const productsRouter = Router();

productsRouter.get('/api/productos-test', isAuthenticated, productController.getAllProducts)

module.exports = productsRouter