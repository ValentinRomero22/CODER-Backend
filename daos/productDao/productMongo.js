const { MongoClient, ObjectId } = require('mongodb')
const ProductDao = require('./productDao')
const { MONGO_CONNECTION } = require('../../config/config')
const { errorLogger } = require('../../utils/winstonLogger')

class ProductMongoDao extends ProductDao {
    constructor(database, collection) {
        super();

        (async () => {
            const connection = await MongoClient.connect(MONGO_CONNECTION, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            const db = connection.db(database)
            this._collection = db.collection(collection)
        })()
    }

    getProducts = async (id) => {
        try {
            if (id) {
                const valueId = Object.values(id)
                const product = await this._collection.findOne({ _id: ObjectId(valueId[0]) })
                return product
            } else {
                const products = await this._collection.find({}).toArray()
                return products
            }
        } catch (error) {
            errorLogger.error(`productMongo.js | getProducts(): ${error}`)
            throw new Error(error)
        }
    }

    saveProduct = async (productToSave) => {
        try {
            const {
                name, description, code, price, stock, image, isTeam, isAlternative
            } = productToSave.data

            const newProduct = {
                name, description, code, price, stock, image, isTeam, isAlternative
            }

            await this._collection.insertOne(newProduct)

            return newProduct
        } catch (error) {
            errorLogger.error(`productMongo.js | saveProduct(): ${error}`)
            throw new Error(error)
        }
    }

    updateProduct = async (id, productToUpdate) => {
        try {
            const result = await this._collection.updateOne(
                { _id: ObjectId(id) },
                { $set: productToUpdate }
            )
            console.log(productToUpdate)

            return productToUpdate
        } catch (error) {
            errorLogger.error(`productMongo.js | updateProduct(): ${error}`)
            throw new Error(error)
        }
    }

    deleteProduct = async (id) => {
        try {
            const valueId = Object.values(id)
            const productDeleted = await this._collection.findOne({ _id: ObjectId(valueId[0]) })

            await this._collection.deleteOne({ _id: ObjectId((valueId[0])) })

            return productDeleted
        } catch (error) {
            errorLogger.error(`productMongo.js | deleteProduct(): ${error}`)
            throw new Error(error)
        }
    }
}

module.exports = ProductMongoDao