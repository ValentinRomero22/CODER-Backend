const {
    getAllPendingOrdersService,
    getAllUserOrdersService,
    saveNewOrderService,
    deliverOrderService,
    getOrderFormService
} = require('../services/orderService')
const { errorLogger } = require('../utils/winstonLogger')

const getAllPendingOrders = async (req, res) => {
    try {
        const orders = await getAllPendingOrdersService()

        if (orders.length > 0) {
            return res.status(200).render('pages/adminOrders', {
                statusCode: 200,
                user: req.user,
                orders
            })
        } else {
            return res.status(404).render('pages/adminOrders', {
                statusCode: 404,
                user: req.user,
            })
        }
    } catch (error) {
        errorLogger.error(`orderController.js | getUserOrder(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getAllUserOrder = async (req, res) => {
    try {
        const { userId } = req.params
        const orders = await getAllUserOrdersService(userId)

        return res.status(200).render('pages/userOrders', {
            orders,
            user: req.user
        })
    } catch (error) {
        errorLogger.error(`orderController.js | getUserOrder(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const saveNewOrder = async (req, res) => {
    try {
        const newOrder = {
            userId: req.user._id,
            userEmail: req.user.email,
            deliveryAddress: req.body.deliveryAddress,
            paymentMethod: req.body.paymentMethod
        }

        const result = await saveNewOrderService(newOrder)

        if (result) {
            return res.status(201).json({
                statusCode: 201,
                message: `Orden generada con éxito. Número de orden: ${result.number}`
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Se produjo un error inesperado. Favor reintentar'
            })
        }
    } catch (error) {
        errorLogger.error(`orderController.js | saveNewOrder(): ${error}`)

        if (error.message.includes('No hay stock suficiente')) {
            return res.status(200).json({
                statusCode: 200,
                message: error.message
            })
        } else {
            return res.status(500).render('pages/error', {
                statusCode: 500,
                user: req.user
            })
        }
    }
}

const deliverOrder = async (req, res) => {
    try {
        const { orderNumber } = req.params

        const result = await deliverOrderService(orderNumber)

        if (result.modifiedCount == 1) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se actualizó el estado de la orden'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró la orden indicada'
            })
        }
    } catch (error) {
        errorLogger.error(`orderController.js | changeOrderState(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getOrderForm = async (req, res) => {
    try {
        const orderCart = await getOrderFormService(req.user._id)

        if (orderCart.items.length > 0) {
            return res.status(200).render('pages/newOrder', {
                cart: orderCart,
                user: req.user
            })
        } else {
            const userId = req.user._id.valueOf()
            return res.redirect(`/carrito/${userId}`)
        }
    } catch (error) {
        errorLogger.error(`orderController.js | getOrderForm(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

module.exports = {
    getAllPendingOrders,
    getAllUserOrder,
    saveNewOrder,
    deliverOrder,
    getOrderForm
}