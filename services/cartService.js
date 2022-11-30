const { isValidObjectId } = require('mongoose')
const CartDao = require('../daos/cartDao')
const { idValidator, productValidator, userValidator } = require('../utils/validateData')
const { errorLogger } = require('../utils/winstonLogger')

const cartDao = new CartDao()

const getCartById = async (req) => {
    try {
        const { id } = req.params

        const isValidId = idValidator(id)
        if (isValidId == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' }

        const cartFound = await cartDao.getById()

        if (cartFound) {
            if (cartFound.error) {
                errorLogger.error(`productService.js: getCartById(): ${cartFound.error}`)
                return { status: 500, message: 'Error: Se produjo un error al buscar el carrito' }
            } else {
                return { status: 200, message: 'Carrito encontrado', data: cartFound }
            }
        } else {
            return { status: 404, message: 'No se encontró el carrito buscado' }
        }
    } catch (error) {
        errorLogger.error(`productService.js: getCartById(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al buscar el carrito' }
    }
}

const saveNewCart = async (req) => {
    try {
        const newCart = {
            timestamp: new Date(),
            user: req.body.user,
            items: [],
            total: 0
        }

        const isValidUser = userValidator(newCart.user)
        if (isValidUser == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' }

        const result = await cartDao.save(newCart)

        if (result.error) {
            errorLogger.error(`productService.js: saveNewCart(): ${result.error}`)
            return { status: 500, message: 'Error: Se produjo un error al guardar el carrito' }
        } else {
            return { status: 201, message: 'Carrito agregado con éxito' }
        }
    } catch (error) {
        errorLogger.error(`productService.js: saveNewCart(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al guardar el carrito' }
    }
}

const addToCart = async (req) => {
    try {
        const { item } = req.body
        const { id } = req.params

        const isValidId = idValidator(id)
        const isValidProduct = productValidator(item.product)
        if (isValidProduct == false || isValidId == false) {
            return { status: 400, message: 'Ingrese los datos necesarios correctamente' }
        }

        const result = await cartDao.addToCart(id, item)

        if (result.error) {
            errorLogger.error(`productService.js: addToCart(): ${error}`)
            return { status: 500, message: 'Error: Se produjo un error al guardar el carrito' }
        } else{
            if(result.modifiedCount == 1){
                return { status: 200, message: 'Producto agregado con éxito' }
            } else{
                return { status: 404, message: 'No se encontró el carrito correspondiente' }
            }
        }
    } catch (error) {
        errorLogger.error(`productService.js: addToCart(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al guardar el carrito' }
    }
}

// RESTAN:
// deleteToCart
// cleanCart