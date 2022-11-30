const { Router } = require('express')
const { 
    getAllProducts,
    getProductById,
    getFormProduct,
    getProductByIdForm,
    saveNewProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/productController')
const { isAuthenticated } = require('../middlewares/functions')

const productsRouter = Router()

productsRouter.get('/', isAuthenticated , getAllProducts)

productsRouter.get('/product/:productId', isAuthenticated, getProductById)

productsRouter.get('/product', isAuthenticated, getFormProduct)

productsRouter.get('/product/form/:productId', isAuthenticated, getProductByIdForm)

productsRouter.post('/product', isAuthenticated, saveNewProduct)

productsRouter.put('/product/:productId', isAuthenticated, updateProduct)

productsRouter.delete('/product/:productId', isAuthenticated, deleteProduct )

module.exports = productsRouter