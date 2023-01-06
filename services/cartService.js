const {
    getCartByUserIdDao,
    saveNewCartDao,
    addToCartDao,
    deleteToCartDao,
    deleteProductToAllCartsDao,
    cleanCartDao,
    updateItemQuantityDao,
    updateDeliveryAddressDao
} = require('../daos/cartDao')
const {
    getProductByIdService
} = require('../services/productService')
const { idValidator } = require('../utils/validateData')

const getCartByUserIdService = async (userId) => {
    try {
        const isValidId = idValidator(userId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const cart = await getCartByUserIdDao(userId)

        if (cart) {
            if (cart.items) {
                let total = 0
                const cartItems = []

                for (let i = 0; i < cart.items.length; i++) {
                    const product = await getProductByIdService(cart.items[i].product._id)
                    const quantity = cart.items[i].quantity
                    cartItems.push({ product, quantity })
                    total = total + (product.price * quantity)
                }

                const newCart = {
                    _id: cart._id,
                    timestamp: cart.timestamp,
                    userId: cart.userId,
                    userEmail: cart.userEmail,
                    items: cartItems,
                    deliveryAddress: cart.deliveryAddress,
                    total: total
                }

                return newCart
            } else {
                return cart
            }
        }

        return cart
    } catch (error) {
        throw error
    }
}

const saveNewCartService = async (newCart) => {
    try {
        const isValidId = idValidator(newCart.userId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        newCart.timestamp = new Date()
        newCart.items = []

        await saveNewCartDao(newCart)
    } catch (error) {
        throw error
    }
}

const addToCartService = async (userId, productId, quantity) => {
    try {
        const isValidUserId = idValidator(userId.valueOf())
        if (isValidUserId == false) throw Error('Error en los datos a utilizar')

        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) throw Error('Error en los datos a utilizar')

        if (quantity < 1) throw Error('La cantidad ingresada no es válida')

        const product = await getProductByIdService(productId)
        if (!product) throw Error('No se encontró el producto indicado para agregar al carrito')

        // ME FIJO SI EL PRODUCTO YA SE ENCONTRABA DENTRO DEL CARRITO DEL CLIENTE
        // SI ES ASÍ, SE ACTUALIZA LA CANTIDAD AGREGADA, SI NO, SIMPLEMENTE SE AGREGA AL CARRITO

        let result = null
        const userCart = await getCartByUserIdService(userId)

        if (userCart.items.length > 0) {
            let exists = false

            for (const item of userCart.items) {
                if (item.product._id.valueOf() == productId) {
                    exists = true
                }
            }

            if (exists) {
                result = await updateItemQuantityDao(userId, productId, quantity)
            } else {
                result = await addToCartDao(userId, { product: productId, quantity })
            }
        } else {
            result = await addToCartDao(userId, { product: productId, quantity })
        }

        return result
    } catch (error) {
        throw error
    }
}

const deleteToCartService = async (userId, productId) => {
    try {
        const isValidCartId = idValidator(userId.valueOf())
        if (isValidCartId == false) throw Error('Error en los datos a utilizar')

        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) throw Error('Error en los datos a utilizar')

        const result = await deleteToCartDao(userId, productId)
        return result
    } catch (error) {
        throw error
    }
}

// FUNCIÓN PARA BORRAR DE TODOS CARRITOS UN PRODUCTO ELIMINADO POR EL ADMIN
const deleteProductToAllCartsService = async (productId) => {
    try {
        const isValidProductId = idValidator(productId)
        if (isValidProductId == false) throw Error('Error en los datos a utilizar')

        const product = await getProductByIdService(productId)
        if (!product) throw Error('No se encontró el producto indicado para quitar de los carritos')

        const result = await deleteProductToAllCartsDao(productId)
        return result
    } catch (error) {
        throw error
    }
}

const cleanCartService = async (userId) => {
    try {
        const isValidId = idValidator(userId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const result = await cleanCartDao(userId)
        return result
    } catch (error) {
        throw error
    }
}

const updateDeliveryAddressService = async (userId, newAddress) => {
    try {
        await updateDeliveryAddressDao(userId, newAddress)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getCartByUserIdService,
    saveNewCartService,
    addToCartService,
    deleteToCartService,
    deleteProductToAllCartsService,
    cleanCartService,
    updateDeliveryAddressService
}