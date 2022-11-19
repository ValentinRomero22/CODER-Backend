const productModel = require('../models/productModel')

class ProductDao{
    async getAll(){
        try{
            const products = productModel.find({})
            return products
        } catch(error){
            return { error: error }
        }
    }

    async getById(productId){
        try{
            const product = productModel.findById({productId})
            return product
        } catch(error){
            return { error: error }
        }
    }

    async save(newProduct){
        try{
            const result = await productModel.create(newProduct)
            return result
        } catch(error){
            return { error: error }
        }
    }

    async update(productToUpdate){
        try{
            const result = await productModel.updateOne(
                { _id: String(productToUpdate.id) },
                { $set:
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
        } catch(error){
            return { error: error }
        }
    }

    async delete(productId){
        try{
            const result = await productModel.deleteOne({ 
                '_id': String(productId) 
            })
            
            return result
        } catch(error){
            return { error: error }
        }
    }
}

module.exports = ProductDao