const cartModel = require('../models/cartModel')

const getCartDao = async (cartId) => {
    try {
        const cartFound = await cartModel.findById(cartId)
        return cartFound
    } catch (error) {
        throw new Error(error)
    }
}

const getCartByUserIdDao = async (userId) => {
    try {
        const cartFound = await cartModel.findOne(
            { userId: userId }
        )

        return cartFound
    } catch (error) {
        throw new Error(error)
    }
}

const saveNewCartDao = async (newCart) => {
    try {
        const result = await cartModel.create(newCart)
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const addToCartDao = async (userId, productId) => {
    try {
        const result = await cartModel.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { products: productId } }
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToCartDao = async (userId, productId) => {
    try {
        const result = await cartModel.findOneAndUpdate(
            { userId: userId },
            {
                $pull: {
                    products: { $in: productId }
                }
            }
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteToAllCartsDao = async (productId) => {
    try {
        const cartsFound = await cartModel.find({})

        for (let i = 0; i < cartsFound.length; i++) {
            for (let j = 0; j < cartsFound[i].products.length; j++) {
                if (cartsFound[i].products[j]?.valueOf() == productId) {
                    await cartModel.findByIdAndUpdate(
                        { _id: cartsFound[i]._id },
                        {
                            $pull: {
                                products: { $in: productId }
                            }
                        }
                    )
                }
            }
        }
    } catch (error) {
        throw new Error(error)
    }
}

const cleanCartDao = async (userId) => {
    try {
        const result = await cartModel.findOneAndUpdate(
            { userId: userId },
            { products: [] }
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getCartDao,
    getCartByUserIdDao,
    saveNewCartDao,
    addToCartDao,
    deleteToCartDao,
    deleteToAllCartsDao,
    cleanCartDao
}