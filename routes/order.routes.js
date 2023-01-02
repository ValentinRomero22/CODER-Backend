const { Router } = require('express')
const {
    getAllPendingOrders,
    getAllUserOrder,
    saveNewOrder,
    deliverOrder,
    getOrderForm
} = require('../controllers/orderController')
const { isAuthenticated } = require('../middlewares/functions')

const orderRouter = Router()

orderRouter.get('/orden', isAuthenticated, getOrderForm)

orderRouter.get('/orden/todas', isAuthenticated, getAllPendingOrders)

orderRouter.get('/orden/todas/:userId', isAuthenticated, getAllUserOrder)

orderRouter.post('/orden', isAuthenticated, saveNewOrder)

orderRouter.put('/orden/:orderNumber', isAuthenticated, deliverOrder)

module.exports = orderRouter