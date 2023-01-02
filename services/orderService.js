const {
    getAllPendingOrdersDao,
    getAllUserOrdersDao,
    saveNewOrderDao,
    deliverOrderDao,
} = require('../daos/orderDao')
const { cleanCartService, getCartByUserIdService } = require('../services/cartService')
const { getProductByIdService, updateStockService } = require('../services/productService')
const { sendOrderClientMail, sendOrderAdminMail } = require('../config/mailConfig')
const { idValidator, orderValidator } = require('../utils/validateData')
const orderModel = require('../models/orderModel')
const { getUserByIdService } = require('./userService')

const getAllPendingOrdersService = async () => {
    try {
        const ordersFound = await getAllPendingOrdersDao()

        if (ordersFound) {
            ordersFound.forEach(order => {
                const formatDate = new Date(order.timestamp)
                order.timestamp = formatDate.toLocaleDateString()
            })
        }

        return ordersFound
    } catch (error) {
        throw error
    }
}

const getAllUserOrdersService = async (userId) => {
    try {
        const isValidId = idValidator(userId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const ordersFound = await getAllUserOrdersDao(userId)

        if (ordersFound) {
            ordersFound.forEach(order => {
                const formatDate = new Date(order.timestamp)
                order.timestamp = formatDate.toLocaleDateString()
            })
        }

        return ordersFound
    } catch (error) {
        throw error
    }
}

const saveNewOrderService = async (newOrder) => {
    try {
        const user = await getUserByIdService(newOrder.userId.valueOf())
        if (!user) throw Error('El usuario vinculado a la orden no es válido')

        const orderCart = await getCartByUserIdService(newOrder.userId)

        const isValidOrder = orderValidator(newOrder)
        if (isValidOrder == false) throw Error('Error en los datos a utilizar')

        const number = await getNewOrderNumber()

        newOrder.number = parseInt(number)
        newOrder.status = 'Generada'
        newOrder.timestamp = new Date()
        newOrder.total = orderCart.total

        // SIMPLIFICO EL ARRAY QUE CONTIENE LOS ÍTEMS
        let items = []
        orderCart.items.forEach(item => {
            items.push(item)
        })

        newOrder.items = items

        // RECORRO LOS ÍTEMS PARA SABER SI PARA TODOS TENGO EL STOCK SUFICIENTE
        // CASO CONTRARIO LANZO EXCEPCIÓN SIN TOCAR EL STOCK DE NINGÚN PRODUCTO
        let product = {}
        for (let i = 0; i < items.length; i++) {
            product = await getProductByIdService(items[i].product._id)

            if (product.stock < items[i].quantity) {
                throw Error(`No hay stock suficiente del producto "${product.name}" para confirmar la compra. Elimínelo de su carrito y vuelva a intentarlo`)
            }
        }

        // SI LLEGO HASTA ACÁ TENGO CANTIDADES CORRECTAS, ENTONCES ACTUALIZO LOS STOCK 
        for (let j = 0; j < items.length; j++) {
            await updateStockService(items[j].product._id, items[j].quantity)
        }

        const result = await saveNewOrderDao(newOrder)

        let htmlProductsList = ''

        // VUELVO A RECORRER LOS ÍTEMS PARA ARMAR EL CUERPO DE AMBOS MAILS
        for (let k = 0; k < items.length; k++) {
            htmlProductsList = htmlProductsList +
                `<p>Producto: ${items[k].product.name} | 
                Precio: $${items[k].product.price} | 
                Cantidad: ${items[k].quantity} | 
                Subtotal: $${items[k].quantity * items[k].product.price}</p></br>`
        }

        htmlProductsList = htmlProductsList + `<strong>TOTAL: $${newOrder.total}</strong>`

        await sendOrderClientMail(htmlProductsList, newOrder)
        await sendOrderAdminMail(htmlProductsList, user)

        await cleanCartService(newOrder.userId)

        return result
    } catch (error) {
        throw error
    }
}

const deliverOrderService = async (orderNumber) => {
    try {
        if (!orderNumber || isNaN(orderNumber) || orderNumber < 1) throw Error('El número de la órden no es válido')

        const result = deliverOrderDao(orderNumber)
        return result
    } catch (error) {
        throw error
    }
}

const getNewOrderNumber = async () => {
    try {
        const maxOrderNumberArray = (await orderModel.find().sort({ number: -1 }).limit(1)).map(
            function (o) { return o.number }
        )

        let numberToReturn = 0

        maxOrderNumberArray.length > 0
            ? numberToReturn = maxOrderNumberArray[0] + 1
            : numberToReturn = 1

        return numberToReturn
    } catch (error) {
        throw error
    }
}

const getOrderFormService = async (userId) => {
    try {
        const isValidId = idValidator(userId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const cartFound = await getCartByUserIdService(userId)
        return cartFound
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPendingOrdersService,
    getAllUserOrdersService,
    saveNewOrderService,
    deliverOrderService,
    getOrderFormService
}