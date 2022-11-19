const ProductDao = require('../daos/productDao')
const { productValidator } = require('../utils/validateData')

const productDao = new ProductDao()

const getAllProducts = async() =>{
    try{
        const productsFound = await productDao.getAll()

        return productsFound ? productsFound : undefined
    } catch(error){
        return { error: error }
    }
}

const getProductById = async(productById) =>{
    try{
        const productFound = await productDao.getById(productById)
        
        return productFound ? productFound : undefined
    } catch(error){
        return { error: error }
    }
}

const saveNewProduct = async(newProduct) =>{
    try{
        const isValid = productValidator(newProduct)

        if(isValid == false) return { errorData: 'Ingrese los datos correctamente' }

        const result = await productDao.save(newProduct)

        return result.nInserted == 1 
        ? { okMessage: 'Producto agregado con éxito' } 
        : { errorMessage: 'Error al agregar el producto' }
    } catch(error){
        return { error: error }
    }
}

const updateProduct = async(productToUpdate) =>{
    try{
        const isValid = productValidator(productToUpdate)

        if(isValid == false) return { errorData: 'Ingrese los datos correctamente' }
        
        const result = await productDao.update(productToUpdate)

        if(result.matchedCount == 1){
            if(result.modifiedCount == 1){
                return { okMessage: 'Producto modificado con éxito' }
            } else{
                return { warnMessage: 'No se detectaron modificaciones' }
            }
        } else{
            return { errorMessage: 'No se encontró el producto a modificar' }  
        }
    } catch(error){
        return { error: error }
    }
}

const deleteProduct = async(productId) =>{
    console.log(productId)
    try{
        const result = await productDao.delete(productId)

        console.log(result)
        return result.deletedCount == 1
        ? { okMessage: 'Producto eliminado con éxito' }
        : { errorMessage: 'No se pudo eliminar el producto' }
    } catch(error){
        return { error: error }
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct
}