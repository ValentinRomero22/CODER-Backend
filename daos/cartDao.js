const cartModel = require('../models/cartModel')

const getCart = async(cartId) =>{
    try{
        const cartFound = await cartModel.findById(cartId)
        return cartFound
    } catch(error){
        throw new Error(error)
    }
}

const saveNewCart = async(newCart) =>{
    try{
        const result = await cartModel.create(newCart)
        return result
    } catch(error){
        throw new Error(error)
    }
}

const addToCart = async (cartId, productToAdd) =>{
    try{
        const result = await cartModel.findByIdAndUpdate(
            { _id: cartId },
            { $addToSet: { products: productToAdd } }
        )

        return result
    } catch(error){
        throw new Error(error)
    }
}

const deleteToCart = async(cartId, productToDelete) =>{
    try{
        const cart = await cartModel.findById(cartId)

        const productsFilter = cart.products.filter((p) =>
            p.name != productToDelete.name
        )

        const result = await cartModel.findByIdAndUpdate(
            { _id: cartId },
            { products: productsFilter }
        )

        return result // o puede retorar el carrito actualizado...

    } catch(error){
        throw new Error(error)
    }
}

const cleanCart = async(cartId) =>{
    try{
        const result = await cartModel.findByIdAndUpdate(
            { _id: cartId },
            { products: [] }
        )

        return result
    } catch(error){
        throw new Error(error)
    }
}

module.exports = {
    getCart,
    saveNewCart,
    addToCart,
    deleteToCart,
    cleanCart
}

/* class CartDao {
    async getById(cartId) {
        try {
            const cart = await cartModel.findById(cartId)
            return cart
        } catch (error) {
            return { error: error }
        }
    }

    async save(user) {
        try {
            const result = await cartModel.create(newCart)
            return result
        } catch (error) {
            return { error, error }
        }
    }

    async addToCart(cartId, item) {
        try {
            const result = await cartModel.updateOne(
                { _id: String(cartId) },
                {
                    $push:
                    {
                        'items': item
                    }
                }
            )

            return result
        } catch (error) {
            return { error: error }
        }
    }

    async deleteToCart(cartId, item) {
        try {
            const result = await cartModel.updateOne(
                { _id: String(cartId) },
                {
                    $pull:
                    {
                        'items.product': {
                            'id': item.product._id,
                            'timestamp': item.product.timestamp,
                            'name': item.product.name,
                            'description': item.product.description,
                            'code': item.product.code,
                            'image': item.product.image,
                            'price': item.product.price,
                            'isAlternative': item.product.isAlternative,
                            'isTeam': item.product.isTeam
                        },
                        'items.quantity': {
                            'quantity': item.quantity
                        }
                    }
                }
            )

            return result
        } catch (error) {
            return { error: error }
        }
    }

    async cleanCart(cartId){
        try{
            const result = await cartModel.updateOne(
                { _id: String(cartId) },
                { $set:
                    {
                        items: []
                    }
                }
            )

            return result
        } catch(error){
            return { error: error }
        }
    }
}

module.exports = CartDao */