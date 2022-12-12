const ProductFileDao = require('./productFile')
const ProductMongoDao = require('./productMongo')

class ProductFactory {
    static get(type) {
        switch (type) {
            case 'FILE':
                return new ProductFileDao(process.cwd() + "/products.json")
            case 'MONGO':
                return new ProductMongoDao('test', 'products')
            default:
                return new ProductFileDao(process.cwd() + "/products.json")
        }
    }
}

module.exports = ProductFactory