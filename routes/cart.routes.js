const { Router } = require('express')
const {
    getCart,
    addToCart,
    deleteToCart,
    cleanCart,
} = require('../controllers/cartController')
const { isAuthenticated } = require('../middlewares/functions')

const cartRouter = Router()

cartRouter.get('/carrito/:userId', isAuthenticated, getCart)

cartRouter.post('/carrito/:productId', isAuthenticated, addToCart)

cartRouter.delete('/carrito/:productId', isAuthenticated, deleteToCart)

cartRouter.delete('/carrito/vaciar/:userId', isAuthenticated, cleanCart)

module.exports = cartRouter