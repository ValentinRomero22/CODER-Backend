const ProductService = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

class ProductController {
    constructor() {
        this.productService = new ProductService()
    }

    getProducts = async (req, res) => {
        try {
            const id = req.params.id

            const products = await this.productService.getProducts(id)

            if (!Array.isArray(products)) {
                res.status(200).render('pages/productsForm', {
                    user: req.user,
                    product: products
                })
            } else {
                res.status(200).render('pages/products', {
                    products: products,
                    user: req.user
                })
            }
        } catch (error) {
            errorLogger.error(`productController.js | getProducts(): ${error}`)
            res.status(500).send({ error: error })
        }
    }

    newProduct = async (req, res) => {
        try {
            res.status(200).render('pages/newProduct', {
                user: req.user
            })
        } catch (error) {
            errorLogger.error(`productController.js | newProduct(): ${error}`)
            res.status(500).send({ error: error })
        }
    }

    saveProduct = async (req, res) => {
        try {
            const productToSave = req.body

            await this.productService.saveProduct(productToSave)

            res.status(200).json({
                result: 'Producto agregado correctamente'
            })
        } catch (error) {
            errorLogger.error(`productController.js | saveProduct(): ${error}`)
            res.status(500).send({ error: error })
        }
    }

    updateProduct = async (req, res) => {        
        try {
            const productToUpdate = req.body
            const id = req.params.id

            await this.productService.updateProduct(id, productToUpdate)

            res.status(200).json({
                result: 'Producto actualizado con éxito'
            })
        } catch (error) {
            errorLogger.error(`productController.js | updateProduct(): ${error}`)
            res.status(500).send({ error: error })
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = req.params.id

            await this.productService.deleteProduct(id)

            res.status(200).json({
                result: 'Producto eliminado con éxito'
            })
        } catch (error) {
            errorLogger.error(`productController.js | deleteProduct(): ${error}`)
            res.status(500).send({ error: error })
        }
    }
}

module.exports = ProductController