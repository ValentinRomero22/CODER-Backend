const { Router } = require('express')
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

        return productRouter
    }
}

module.exports = ProductRouter