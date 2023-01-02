const { Router } = require('express')
const {
    getAllProducts,
    getProductById,
    getProductByCategory,
    getFormProduct,
    saveNewProduct,
    updateProduct,
    updateStock,
    deleteProduct,
    enableProduct,
    getDetailProductById
} = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/functions')

const productsRouter = Router()

productsRouter.get('/productos', isAuthenticated, getAllProducts)

productsRouter.get('/productos/:productId', isAuthenticated, getProductById)

productsRouter.get('/producto/form/nuevo', isAuthenticated, getFormProduct)

productsRouter.get('/productos/form/:productId', isAuthenticated, getDetailProductById)

productsRouter.get('/productos/categoria/:category', isAuthenticated, getProductByCategory)

productsRouter.post('/productos', isAuthenticated, saveNewProduct)

productsRouter.put('/productos/:productId', isAuthenticated, updateProduct)

productsRouter.put('/productos/habilitar/:productId', isAuthenticated, enableProduct)

productsRouter.delete('/productos/:productId', isAuthenticated, deleteProduct)

module.exports = productsRouter