const {
    getCartDao,
    getCartByUserIdDao,
    saveNewCartDao,
    addToCartDao,
    deleteToCartDao,
    deleteToAllCartsDao,
    cleanCartDao
} = require('../daos/cartDao')
const {
    getProductByIdService,
    deleteProductService
} = require('../services/productService')
const { idValidator } = require('../utils/validateData')
const sendWhatsapp = require('../config/whatsappConfig')
const sendSMS = require('../config/smsConfig')
const { sendOrderMail } = require('../config/mailConfig')

const getCartService = async (cartId) => {
    try {
        const isValidId = idValidator(cartId)
        if (isValidId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const cart = await getCartDao(cartId)
        return cart
    } catch (error) {
        throw new Error(error)
    }
}

const getCartByUserIdService = async (userId) => {
    try {
        const isValidId = idValidator(userId.valueOf())
        if (isValidId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const cart = await getCartByUserIdDao(userId)

        if (cart.products) {
            let total = 0
            const cartProducts = []

            for (let i = 0; i < cart.products.length; i++) {
                const product = await getProductByIdService(cart.products[i])
                total = total + product.price
                cartProducts.push(product)
            }

            const newCart = {
                _id: cart._id,
                timestamp: cart.timestamp,
                userId: cart.userId,
                products: cartProducts,
                total: total
            }

            return newCart
        } else {
            return cart
        }
    } catch (error) {
        throw new Error(error)
    }
}

const saveNewCartService = async (newCart) => {
    try {
        const isValidId = idValidator(newCart.userId.valueOf())
        if (isValidId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        newCart.timestamp = new Date()
        newCart.products = []

        const result = await saveNewCartDao(newCart)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const addToCartService = async (userId, productId) => {
    try {
        const isValidUserId = idValidator(userId.valueOf())
        if (isValidUserId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const result = await addToCartDao(userId, productId)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToCartService = async (userId, productId) => {
    try {
        const isValidCartId = idValidator(userId.valueOf())
        if (isValidCartId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const result = await deleteToCartDao(userId, productId)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToCartsAndProductService = async (cartId, productId) => {
    try {
        const isValidCartId = idValidator(cartId.valueOf())
        if (isValidCartId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        await deleteToAllCartsDao(productId)
        const result = await deleteProductService(productId)

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const cleanCartService = async (userId) => {
    try {
        const isValidId = idValidator(userId.valueOf())
        if (isValidId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const result = await cleanCartDao(userId)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const checkoutService = async (user) => {
    try {
        const isValidId = idValidator(user._id.valueOf())
        if (isValidId == false) {
            throw new Error('Error en los datos a utilizar')
        }

        const userCart = await getCartByUserIdService(user._id)

        let total = 0
        let htmlProductsList = ''

        for (let i = 0; i < userCart.products.length; i++) {
            const product = userCart.products[i]
            htmlProductsList = htmlProductsList + `<p>Producto: ${product.name} | Precio: $${product.price}</p></br>`
            total = total + product.price
        }

        htmlProductsList = htmlProductsList + `<p>TOTAL: $${total}</p>`

        const smsBody = 'Su pedido ha sido confirmado! Lo recibirá dentro de las próximas 24 horas hábiles. Tu Pilcha UY'
        const whatsappBody = `Nuevo pedido de ${user.username}. Verifique su mail para más detalle.`

        await sendSMS(smsBody, user.phone)
        await sendWhatsapp(whatsappBody, user.phone)
        await sendOrderMail(htmlProductsList, user)
        
        await cleanCartService(user._id)
        
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getCartService,
    getCartByUserIdService,
    saveNewCartService,
    addToCartService,
    deleteToCartService,
    deleteToCartsAndProductService,
    cleanCartService,
    checkoutService
}