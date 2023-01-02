const orderModel = require('../models/orderModel')

const getAllPendingOrdersDao = async () => {
    try {
        const ordersFound = await orderModel.find({
            status: 'Generada'
        })
        return ordersFound
    } catch (error) {
        throw error
    }
}

const getAllUserOrdersDao = async (userId) => {
    try {
        const ordersFound = await orderModel.find({
            userId: userId
        })

        return ordersFound
    } catch (error) {
        throw error
    }
}

const saveNewOrderDao = async (newOrder) => {
    try {
        const result = await orderModel.create(newOrder)
        return result
    } catch (error) {
        throw error
    }
}

const deliverOrderDao = async (orderNumber) => {
    try {
        const result = await orderModel.updateOne(
            { number: orderNumber },
            {
                $set: { status: 'Entregada' }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPendingOrdersDao,
    getAllUserOrdersDao,
    saveNewOrderDao,
    deliverOrderDao
}