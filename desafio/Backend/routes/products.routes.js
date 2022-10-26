const { Router } = require('express')
const { createProducts } = require('../controllers/fakerProduct')
const { isAuthenticated } = require('../middlewares/functions')

const productsRouter = Router();

productsRouter.get('/api/productos-test', isAuthenticated, createProducts.getProducts)

module.exports = productsRouter