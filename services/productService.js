const { PERSISTENCE } = require('../config/config')
const ProductFactory = require('../daos/productDao/productFactory')
const Product = require('../models/product')
const { errorLogger } = require('../utils/winstonLogger')

class ProductService {
    constructor() {
        this.productDao = ProductFactory.get(PERSISTENCE)
    }

    static isValidProduct(product, required){
        try{
            Product.productValidate(product, required)
        } catch(error){
            errorLogger.error(`productService.js | isValidProduct(): ${error}`)
            throw new Error('Los datos no son válidos')
        }
    }

    async getProducts(id) {
        return await this.productDao.getProducts(id)
    }

    async saveProduct(productToSave) {
        productToSave.stock = 10
        productToSave.timestamp = new Date()
        ProductService.isValidProduct(productToSave, true)

        await this.productDao.saveProduct(productToSave)
    }

    async updateProduct(id, productToUpdate){
        ProductService.isValidProduct(productToUpdate, false)

        await this.productDao.updateProduct(id, productToUpdate)
    }

    async deleteProduct(id){
        await this.productDao.deleteProduct(id)
    }
}

module.exports = ProductService