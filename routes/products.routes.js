const { Router } = require('express')
const { createProducts } = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/functions')

const productsRouter = Router();

productsRouter.get('/api/productos-test', isAuthenticated, createProducts)

module.exports = productsRouter