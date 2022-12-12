const { Router } = require('express')
/* const { createProducts } = require('../controllers/productController') */
const isAuthenticated = require('../middlewares/functions')
const ProductController = require('../controllers/productController')

const productRouter = Router()

class ProductRouter {
    constructor() {
        this.productController = new ProductController()
    }

    start() {
        productRouter.get('/', isAuthenticated, this.productController.getProducts)
        productRouter.get('/form/:id', isAuthenticated, this.productController.getProducts)
        productRouter.get('/newProduct', isAuthenticated, this.productController.newProduct)
        productRouter.post('/newProduct', isAuthenticated, this.productController.saveProduct)
        productRouter.put('/:id', isAuthenticated, this.productController.updateProduct)
        productRouter.delete('/:id', isAuthenticated, this.productController.deleteProduct)

        return productRouter
    }
}

module.exports = ProductRouter

/* productsRouter.get('/api/productos-test', isAuthenticated, createProducts)

module.exports = productsRouter */