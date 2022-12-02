const {
    getCartByUserIdService,
    saveNewCartService,
    addToCartService,
    deleteToCartService,
    deleteToCartsAndProductService,
    cleanCartService,
    checkoutService
} = require('../services/cartService')
const { errorLogger } = require('../utils/winstonLogger')

const getCart = async (req, res) => {
    try {
        const { userId } = req.params
        const cart = await getCartByUserIdService(userId)

        res.status(200).render('pages/cart', {
            cart: cart,
            user: req.user
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | getCart(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar recuperar el carrito',
            user: req.user
        })
    }
}

const saveNewCart = async (req, res) => {
    try {
        const newCart = {
            userId: req.user._id
        }

        await saveNewCartService(newCart)
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | saveNewCart(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar agregar un producto al carrito',
            user: req.user
        })
    }
}

const addToCart = async (req, res) => {
    try {
        const userId = req.user._id
        const { productId } = req.params
        await addToCartService(userId, productId)

        res.status(200).json({
            message: 'Producto agregado al carrito'
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | addToCart(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar agregar un producto al carrito',
            user: req.user
        })
    }
}

const deleteToCart = async (req, res) => {
    try {
        const { productId } = req.params
        const userId = req.user._id

        await deleteToCartService(userId, productId)

        res.status(200).json({
            message: 'Producto eliminado del carrito'
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | deleteToCart(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar borrar un producto del carrito',
            user: req.user
        })
    }
}

const deleteToCartsAndProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const cartId = req.user._id

        await deleteToCartsAndProductService(cartId, productId)

        res.status(200).json({
            message: 'Producto eliminado del carrito'
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | deleteToCartsAndProduct(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar borrar un producto del carrito',
            user: req.user
        })
    }
}

const cleanCart = async (req, res) => {
    try {
        const userId = req.user._id
        await cleanCartService(userId)

        res.status(200).json({
            message: 'Carrito vaciado con éxito'
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | cleanCart(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar vaciar el carrito',
            user: req.user
        })
    }
}

const checkout = async (req, res) => {
    try {
        const user = req.user
        await checkoutService(user)

        res.status(200).json({
            message: 'Pedido generado con éxito!'
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: cartController.js | checkout(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar confirmar la compra',
            user: req.user
        })
    }
}

module.exports = {
    getCart,
    saveNewCart,
    addToCart,
    deleteToCart,
    deleteToCartsAndProduct,
    cleanCart,
    checkout
}