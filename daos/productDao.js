const productModel = require('../models/productModel')

const getAllProductsDao = async () => {
    try {
        const productsFound = await productModel.find({})
        return productsFound
    } catch (error) {
        throw new Error(error)
    }
}

const getProductByIdDao = async (productId) => {
    try{
        const productFound = await productModel.findById(productId)
        return productFound
    } catch(error){
        throw new Error(error)
    }
}

const saveNewProductDao = async (newProduct) =>{
    try{
        const result = await productModel.create(newProduct)
        return result
    } catch(error){
        throw new Error(error)
    }
}

const updateProductDao = async (productToUpdate) =>{
    try{
        const result = await productModel.findByIdAndUpdate(productToUpdate.id, productToUpdate)
        return result
    } catch(error){
        throw new Error(error)
    }
}

const deleteProductDao = async(productId) =>{
    try{
        const result = await productModel.findByIdAndDelete(productId)
        return result
    } catch(error) {
        throw new Error(error)
    }
}

module.exports = {
    getAllProductsDao,
    getProductByIdDao,
    saveNewProductDao,
    updateProductDao,
    deleteProductDao
}