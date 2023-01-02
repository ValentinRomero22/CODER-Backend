const {
    getCartByUserIdService,
    saveNewCartService,
    addToCartService,
    deleteToCartService,
    deleteProductToAllCartsService,
    cleanCartService,
} = require('../services/cartService')
const { errorLogger } = require('../utils/winstonLogger')

const getCart = async (req, res) => {
    try {
        const { userId } = req.params
        const cart = await getCartByUserIdService(userId)

        return res.status(200).render('pages/cart', {
            user: req.user,
            cart: cart
        })
    } catch (error) {
        errorLogger.error(`cartController.js | getCart(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const saveNewCart = async (req, res) => {
    try {
        const newCart = {
            userId: req.user._id,
            userEmail: req.user.email,
            deliveryAddress: req.body.address
        }

        const result = await saveNewCartService(newCart)

        if (result) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Carrito agregado con éxito',
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Se produjo un error inesperado. Favor reintentar'
            })
        }
    } catch (error) {
        errorLogger.error(`cartController.js | saveNewCart(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params
        const { quantity } = req.body

        const result = await addToCartService(userId, productId, quantity)

        if (result.matchedCount == 1) {
            if (result.modifiedCount == 1) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Producto agregado al carrito'
                })
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'No se encontró el producto indicado'
                })
            }
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el carrito del usuario indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`cartController.js | addToCart(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const deleteToCart = async (req, res) => {
    try {
        const { productId } = req.params
        const userId = req.user._id

        const result = await deleteToCartService(userId, productId)

        if (result.matchedCount == 1) {
            if (result.modifiedCount == 1) {
                return res.status(200).json({
                    statusCode: 200,
                    message: 'Se quitó el producto correctamente'
                })
            } else {
                return res.status(404).json({
                    statusCode: 404,
                    message: 'No se encontró el producto indicado'
                })
            }
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el carrito del usuario indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`cartController.js | deleteToCart(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const deleteProductToAllCarts = async (req, res) => {
    try {
        const { productId } = req.params
        const cartId = req.user._id

        const result = await deleteProductToAllCartsService(cartId, productId)

        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se quitó el producto de los carritos en los que estaba agregado'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'El producto no se encontraba dentro de ningún carrito'
            })
        }
    } catch (error) {
        errorLogger.error(`cartController.js | deleteToCartsAndProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const cleanCart = async (req, res) => {
    try {
        const userId = req.user._id
        const result = await cleanCartService(userId, '63a7503d3561dc66c2a5004e')

        if (result.matchedCount == 1) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Carrito vaciado con éxito'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el carrito del usuario indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`cartController.js | cleanCart(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

module.exports = {
    getCart,
    saveNewCart,
    addToCart,
    deleteToCart,
    deleteProductToAllCarts,
    cleanCart
}