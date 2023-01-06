const cartModel = require('../models/cartModel')

const getCartByUserIdDao = async (userId) => {
    try {
        const cartFound = await cartModel.findOne(
            { userId: userId }
        )

        return cartFound
    } catch (error) {
        throw error
    }
}

const saveNewCartDao = async (newCart) => {
    try {
        const result = await cartModel.create(newCart)
        return result
    } catch (error) {
        throw error
    }
}

const addToCartDao = async (userId, item) => {
    try {
        const result = await cartModel.updateOne(
            { userId: userId },
            {
                $push: { items: item }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

const deleteToCartDao = async (userId, productId) => {
    try {
        const result = await cartModel.updateOne(
            { userId: userId },
            {
                $pull: {
                    items: {
                        product: { _id: productId }
                    }
                }
            }
        )

        return result
    } catch (error) {
        throw error
    }
}

const deleteProductToAllCartsDao = async (productId) => {
    try {
        const cartsFound = await cartModel.find({})

        let result = null

        for (let i = 0; i < cartsFound.length; i++) {
            for (let j = 0; j < cartsFound[i].items.length; j++) {
                if (cartsFound[i].items[j].product.valueOf() == productId) {
                    result = await cartModel.updateOne(
                        { _id: cartsFound[i]._id },
                        {
                            $pull: {
                                items: {
                                    product: { _id: productId }
                                }
                            }
                        }
                    )
                }
            }
        }

        return result
    } catch (error) {
        throw error
    }
}

const cleanCartDao = async (userId) => {
    try {
        const result = await cartModel.updateOne(
            { userId: userId },
            { items: [] }
        )

        return result
    } catch (error) {
        throw error
    }
}

const updateItemQuantityDao = async (userId, productId, quantity) => {
    try {
        const result = await cartModel.updateOne(
            { userId: userId, items: { $elemMatch: { product: productId } } },
            { $inc: { "items.$.quantity": + quantity } }
        )

        return result
    } catch (error) {
        throw error
    }
}

const updateDeliveryAddressDao = async (userId, newAddress) => {
    try {
        await cartModel.updateOne(
            { userId: userId },
            { deliveryAddress: newAddress }
        )
    } catch (error) {
        throw error
    }
}

module.exports = {
    getCartByUserIdDao,
    saveNewCartDao,
    addToCartDao,
    deleteToCartDao,
    deleteProductToAllCartsDao,
    cleanCartDao,
    updateItemQuantityDao,
    updateDeliveryAddressDao
}