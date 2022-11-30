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

/* class ProductDao {
    async getAll() {
        try {
            const products = await productModel.find({})
            return products
        } catch (error) {
            return { error: error }
        }
    }

    async getById(productId) {
        try {
            const product = await productModel.findById(productId)
            return product
        } catch (error) {
            return { error: error }
        }
    }

    async save(newProduct) {
        try {
            const result = await productModel.create(newProduct)
            return result
        } catch (error) {
            return { error: error }
        }
    }

    async update(productToUpdate) {
        try {
            const result = await productModel.updateOne(
                { _id: String(productToUpdate.id) },
                {
                    $set:
                    {
                        name: productToUpdate.name,
                        description: productToUpdate.description,
                        code: productToUpdate.code,
                        image: productToUpdate.image,
                        price: productToUpdate.price,
                        isAlternative: productToUpdate.isAlternative,
                        isTeam: productToUpdate.isTeam
                    }
                }
            )

            return result
        } catch (error) {
            return { error: error }
        }
    }

    async delete(productId) {
        try {
            const result = await productModel.deleteOne({
                '_id': String(productId)
            })

            return result
        } catch (error) {
            return { error: error }
        }
    }
}

module.exports = ProductDao */