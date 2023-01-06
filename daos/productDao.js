const productModel = require('../models/productModel')

const getAllProductsDao = async () => {
    try {
        const productsFound = await productModel.find({})
        return productsFound
    } catch (error) {
        throw error
    }
}

const getProductByIdDao = async (productId) => {
    try {
        const productFound = await productModel.findById(productId)
        return productFound
    } catch (error) {
        throw error
    }
}

const getProductByCategoryDao = async (category) => {
    try {
        const productsFound = await productModel.find({ category: category })
        return productsFound
    } catch (error) {
        throw error
    }
}

const saveNewProductDao = async (newProduct) => {
    try {
        const result = await productModel.create(newProduct)
        return result
    } catch (error) {
        throw error
    }
}

const updateProductDao = async (productId, productToUpdate) => {
    try {
        const result = await productModel.findByIdAndUpdate(productId, productToUpdate)
        return result
    } catch (error) {
        throw error
    }
}

const updateStockDao = async (productId, amountToSubtract) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            { $inc: { stock: - amountToSubtract } }
        )

        return result
    } catch (error) {
        throw error
    }
}

// LE APLICO BAJA LÓGICA A LOS PRODUCTOS PARA NO BORRARLOS DE LA BD Y PODER RECUPERARLOS PARA CONSULTAR LAS ÓRDENES YA CREADAS
const deleteProductDao = async (productId) => {
    try {
        const result = await productModel.findOneAndUpdate(
            { _id: productId },
            [{
                $set: {
                    enabled: {
                        $eq: [false, "$enabled"]
                    }
                }
            }]
        )

        return result
    } catch (error) {
        throw error
    }
}

const enableProductDao = async (productId) => {
    try {
        const result = await productModel.updateOne(
            { _id: productId },
            { $set: { enabled: true } }
        )

        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProductsDao,
    getProductByIdDao,
    getProductByCategoryDao,
    saveNewProductDao,
    updateProductDao,
    updateStockDao,
    deleteProductDao,
    enableProductDao
}