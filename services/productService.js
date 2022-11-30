const {
    getAllProductsDao,
    getProductByIdDao,
    saveNewProductDao,
    updateProductDao,
    deleteProductDao
} = require('../daos/productDao')
const { idValidator, productValidator } = require('../utils/validateData')

const getAllProductsService = async () => {
    try{
        const products = await getAllProductsDao()
        return products
    } catch(error){
        throw new Error(error)
    }
}

const getProductByIdService = async (productId) =>{
    try{
        const isValidId = idValidator(productId.valueOf())
        if(isValidId == false){
            throw new Error('Error en los datos a utilizar')
        }

        const product = await getProductByIdDao(productId)
        return product
    } catch(error){
        throw new Error(error)
    }
}

const saveNewProductService = async(newProduct) =>{
    try{
        const isValidProduct = productValidator(newProduct)
        if (isValidProduct == false){
            throw new Error('Complete los datos necesarios correctamente')
        }

        newProduct.timestamp = new Date()

        const result = await saveNewProductDao(newProduct)
        return result
    } catch(error){
        throw new Error(error)
    }
}

const updateProductService = async (productToUpdate) =>{
    try{
        const isValidId = idValidator(productToUpdate.id)
        if(isValidId == false){
            throw new Error('Error en los datos a utilizar')
        }

        const isAValidProduct = productValidator(productToUpdate)
        if (isAValidProduct == false){
            throw new Error('Complete los datos necesarios correctamente')
        }

        const result = await updateProductDao(productToUpdate)
        return result
    } catch(error){
        throw new Error(error)
    }
} 

const deleteProductService = async (productId) =>{
    try{
        const isValidId = idValidator(productId)
        if(isValidId == false){
            throw new Error('Error en los datos a utilizar')
        }

        const result = await deleteProductDao(productId)
        return result
    } catch(error){
        throw new Error(error)
    }
}

module.exports = {
    getAllProductsService,
    getProductByIdService,
    saveNewProductService,
    updateProductService,
    deleteProductService
}