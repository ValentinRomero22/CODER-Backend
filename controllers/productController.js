const productService = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

const productController = {
    getAllProducts: (req, res) => {
        try {
            productService.getAllProducts()
                .then((response) => {
                    if (response.length == 0) {
                        res.status(404).send({
                            message: { notFound: 'No se han encontrado productos' }
                        })
                    } else if (response.error) {
                        errorLogger.error(`productControler.js | getAllProducts(): ${response.error}`)
                        res.status(500).send({
                            message: { error: 'Error: se produjo un error al listar los productos' }
                        })
                    } else {
                        res.status(200).send({
                            message: { okMessage: 'Productos encontrados' },
                            data: response
                        })
                    }
                })
        } catch (error) {
            errorLogger.error(`productControler.js | getAllProducts(): ${error}`)
            res.status(500).send({
                message: { error: 'Error: se produjo un error inesperado' }
            })
        }
    },
    getProductById: (req, res) => {
        try {
            const { id } = req.params

            productService.getProductById(id)
                .then((response) => {
                    if (response.length == 0) {
                        res.status(404).send({
                            message: { notFound: `No se han encontró el producto con el id ${id}` }
                        })
                    } else if (response.error) {
                        errorLogger.error(`productControler.js | getProductById(): ${response.error}`)
                        res.status(500).send({
                            message: { error: 'Error: se produjo un error al buscar el producto' }
                        })
                    } else {
                        res.status(200).send({
                            message: { okMessage: 'Producto encontrado' },
                            data: response
                        })
                    }
                })
        } catch (error) {
            errorLogger.error(`productControler.js | getProductById(): ${error}`)
            res.status(500).send({
                message: { error: 'Error: se produjo un error inesperado' }
            })
        }
    },
    saveNewProduct: (req, res) => {
        try {
            const { id } = req.params

            productService.saveNewProduct()
                .then((response) => {
                    if (response.errorData) {
                        errorLogger.error(`productControler.js | saveNewProduct(): ${response.errorData}`)
                        res.status(400).send({
                            message: { errorData: response.errorData }
                        })
                    } else if (response.errorMessage) {
                        errorLogger.error(`productControler.js | saveNewProduct(): ${response.errorMessage}`)
                        res.status(500).send({
                            message: { errorMessage: response.errorMessage }
                        })
                    } else if (response.okMessage) {
                        res.status(200).send({
                            message: { okMessage: response.okMessage }
                        })
                    } else {
                        errorLogger.error(`productControler.js | saveNewProduct(): ${response.error}`)
                        res.status(500).send({
                            message: { error: 'Error: se produjo un error al guardar el producto' }
                        })
                    }
                })
        } catch (error) {
            errorLogger.error(`productControler.js | saveNewProduct(): ${error}`)
            res.status(500).send({
                message: { error: 'Error: se produjo un error inesperado' }
            })
        }
    },
    updateProduct: (req, res) => {
        try {
            const { id } = req.params
            const { name, description, code, image, isAlternative, isTeam } = req.body
            const price = parseInt(req.body.price)

            const productToUpdate = {
                id,
                name,
                description,
                code,
                image,
                price,
                isAlternative,
                isTeam
            }

            productService.updateProduct(productToUpdate)
                .then((response) => {
                    if (response.errorData) {
                        errorLogger.error(`productControler.js | updateProduct(): ${response.errorData}`)
                        res.status(400).send({
                            message: { errorData: response.errorData }
                        })
                    } else if (response.errorMessage) {
                        errorLogger.error(`productControler.js | updateProduct(): ${response.errorMessage}`)
                        res.status(500).send({
                            message: { errorMessage: response.errorMessage }
                        })
                    } else if (response.warnMessage) {
                        res.status(200).send({
                            message: { warnMessage: response.warnMessage }
                        })
                    } else if (response.okMessage) {
                        res.status(200).send({
                            message: { okMessage: response.okMessage }
                        })
                    } else {
                        errorLogger.error(`productControler.js | updateProduct(): ${response.error}`)
                        res.status(500).send({
                            message: { error: 'Error: se produjo un error al modificar el producto' }
                        })
                    }
                })
        } catch (error) {
            errorLogger.error(`productControler.js | updateProduct(): ${error}`)
            res.status(500).send({
                message: 'Error: se produjo un error inesperado'
            })
        }
    },
    deleteProduct: (req, res) =>{
        try {
            const { id } = req.params

            productService.deleteProduct(id)
                .then((response) => {
                    if (response.errorMessage) {
                        errorLogger.error(`productControler.js | deleteProduct(): ${response.errorMessage}`)
                        res.status(404).send({
                            message: { notFound: response.errorMessage }
                        })
                    } else if (response.okMessage) {
                        res.status(200).send({
                            message: { okMessage: response.okMessage }
                        })
                    } else {
                        errorLogger.error(`productControler.js | deleteProduct(): ${response.error}`)
                        res.status(500).send({
                            message: { error: 'Error: se produjo un error al eliminar el producto' }
                        })
                    }
                })
        } catch (error) {
            errorLogger.error(`productControler.js | deleteProduct(): ${error}`)
            res.status(500).send({
                message: { error: 'Error: se produjo un error inesperado' }
            })
        }
    }
}

module.exports = productController