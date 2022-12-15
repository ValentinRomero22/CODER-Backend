const ProductDao = require('./productDao')
const fs = require('fs')
const { errorLogger } = require('../../utils/winstonLogger')

class ProductFileDao extends ProductDao {
    constructor(fileName) {
        super()
        this.fileName = fileName
    }

    async read(file) {
        return JSON.parse(await fs.promises.readFile(file, 'utf-8'))
    }

    async save(file, products) {
        /* await fs.promises.writeFile(file, JSON.stringify(products, null, '\t')) */
        await fs.promises.writeFile(file, JSON.stringify(products))
    }

    getProducts = async (_id) => {
        try {
            if (_id) {
                const valueId = Object.values(_id)
                let products = await this.read(this.fileName)
                let index = products.findIndex((product) => product._id == valueId[0])

                return index >= 0
                    ? products[index]
                    : []
            } else {
                let products = await this.read(this.fileName)
                return products
            }
        } catch (error) {
            errorLogger.error(`productFile.js | getProducts(): ${error}`)
            throw new Error(error)
        }
    }

    saveProduct = async (productToSave) => {
        try {
            let products = await this.read(this.fileName)
            let _id = this.getNext_Id(products)

            const { 
                name, description, code, price, stock, image, isTeam, isAlternative
            } = productToSave.data                        

            const newProduct = {
                _id, name, description, code, price, stock, image, isTeam, isAlternative
            }

            products.push(newProduct)

            await this.save(this.fileName, products)

            return newProduct
        } catch (error) {
            errorLogger.error(`productFile.js | saveProduct(): ${error}`)
            throw new Error(error)
        }
    }

    updateProduct = async (_id, productToUpdate) => {
        try {
            let products = await this.read(this.fileName)
            let index = this.getIndex(_id, products)
            let currentProduct = products[index] || {}
            let productUpdated = { ...currentProduct, ...productToUpdate }

            index >= 0
                ? products.splice(index, 1, productUpdated)
                : products.push(productUpdated)

            await this.save(this.fileName, products)

            return productUpdated
        } catch (error) {
            errorLogger.error(`productFile.js | updateProduct(): ${error}`)
            throw new Error(error)
        }
    }

    deleteProduct = async (_id) => {
        try {
            const valueId = Object.values(_id)
            let products = await this.read(this.fileName)
            let index = this.getIndex(valueId[0], products)

            if (index == -1) throw new Error('Producto no encontrado')
            
            const productResult = products[index]
            products.splice(index, 1)[0]

            await this.save(this.fileName, products)

            return productResult
        } catch (error) {
            errorLogger.error(`productMemory.js | deleteProduct(): ${error}`)
            throw new Error(error)
        }
    }
}

module.exports = ProductFileDao