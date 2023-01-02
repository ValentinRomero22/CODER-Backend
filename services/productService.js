const {
    getAllProductsDao,
    getProductByIdDao,
    getProductByCategoryDao,
    saveNewProductDao,
    updateProductDao,
    updateStockDao,
    deleteProductDao,
    enableProductDao
} = require('../daos/productDao')
const { idValidator, productValidator } = require('../utils/validateData')

const getAllProductsService = async () => {
    try {
        const products = await getAllProductsDao()
        return products
    } catch (error) {
        throw error
    }
}

const getProductByIdService = async (productId) => {
    try {
        const isValidId = idValidator(productId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const product = await getProductByIdDao(productId)
        return product
    } catch (error) {
        throw error
    }
}

const getProductByCategoryService = async (category) => {
    try {
        if (category.trim() == '') throw Error('Favor indique una categoría')

        const productsFound = await getProductByCategoryDao(category)
        return productsFound
    } catch (error) {
        throw error
    }
}

const saveNewProductService = async (newProduct) => {
    try {
        const isValidProduct = productValidator(newProduct)
        if (isValidProduct == false) throw Error('Complete los datos necesarios correctamente')

        const result = await saveNewProductDao(newProduct)
        return result
    } catch (error) {
        throw error
    }
}

const updateProductService = async (productId, productToUpdate) => {
    try {
        const isValidId = idValidator(productId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const isAValidProduct = productValidator(productToUpdate)
        if (isAValidProduct == false) throw Error('Complete los datos necesarios correctamente')

        const result = await updateProductDao(productId, productToUpdate)
        return result
    } catch (error) {
        throw error
    }
}

const updateStockService = async (productId, amountToSubtract) => {
    try {
        const isValidId = idValidator(productId.valueOf())
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const parsedAmount = parseInt(amountToSubtract)
        if (parsedAmount < 1) throw Error('Error en la cantidad de unidades a descontar')

        const result = await updateStockDao(productId, parsedAmount)
        return result
    } catch (error) {
        throw error
    }
}

const deleteProductService = async (productId) => {
    try {
        const isValidId = idValidator(productId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const result = await deleteProductDao(productId)
        return result
    } catch (error) {
        throw error
    }
}

const enableProductService = async (productId) => {
    try {
        const isValidId = idValidator(productId)
        if (isValidId == false) throw Error('Error en los datos a utilizar')

        const result = await enableProductDao(productId)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    getProductByCategoryService,
    saveNewProductService,
    updateProductService,
    updateStockService,
    deleteProductService,
    enableProductService
}