const { Router } = require('express')
const {
    getCart,
    addToCart,
    deleteToCart,
    deleteToCartsAndProduct,
    cleanCart
} = require('../controllers/cartController')
const { isAuthenticated } = require('../middlewares/functions')

const cartRouter = Router()

cartRouter.get('/cart/:userId', isAuthenticated, getCart)

cartRouter.post('/cart/:productId', isAuthenticated, addToCart)

cartRouter.delete('/cart/product/:productId', isAuthenticated, deleteToCartsAndProduct)

cartRouter.delete('/cart/:productId', isAuthenticated, deleteToCart)

cartRouter.delete('/cart/clean/:userId', isAuthenticated, cleanCart)

module.exports = cartRouter