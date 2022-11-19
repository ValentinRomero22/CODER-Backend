const ProductDao = require('../daos/productDao')
const { idValidator, productValidator } = require('../utils/validateData')
const { errorLogger } = require('../utils/winstonLogger')

const productDao = new ProductDao()

const getAllProducts = async () => {
    try {
        const productsFound = await productDao.getAll()

        if (productsFound.length != 0) {
            if (productsFound.error) {
                errorLogger.error(`productService.js: getAllProducts(): ${productsFound.error}`)
                return { status: 500, message: 'Error: Se produjo un error al buscar los productos' }
            } else {
                return { status: 200, message: 'Productos encontrados', data: productsFound } //PROBADO OK
            }
        } else {
            return { status: 404, message: 'No existen productos' } //PROBADO OK
        }
    } catch (error) {
        errorLogger.error(`productService.js: getAllProducts(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al buscar productos' }
    }
}

const getProductById = async (req) => {
    try {
        const { id } = req.params

        const isValidId = idValidator(req.params.id)
        if (isValidId == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' } //PROBADO OK

        const productFound = await productDao.getById(id)

        if (productFound) {
            if (productFound.error) {
                errorLogger.error(`productService.js: getProductById(): ${productFound.error}`)
                return { status: 500, message: 'Error: Se produjo un error al buscar el productooo' }
            } else {
                return { status: 200, message: 'Producto encontrado', data: productFound } //PROBADO OK
            }
        } else {
            return { status: 404, message: 'No se encontró el producto buscado' } //PROBADO OK
        }
    } catch (error) {
        errorLogger.error(`productService.js: getProductById(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al buscar el producto' } //PROBADO OK
    }
}

const saveNewProduct = async (req) => {
    try {
        const newProduct = {
            timestamp: new Date(),
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            image: req.body.image,
            price: req.body.price,
            isAlternative: req.body.isAlternative,
            isTeam: req.body.isTeam
        }

        const isValid = productValidator(newProduct)
        if (isValid == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' } //PROBADO OK

        const result = await productDao.save(newProduct)

        if (result.error) {
            errorLogger.error(`productService.js: saveNewProduct(): ${result.error}`)
            return { status: 500, message: 'Error: Se produjo un error al agregar el producto' }
        } else {
            return { status: 201, message: 'Producto agregado con éxito' } //PROBADO OK
        }
    } catch (error) {
        errorLogger.error(`productService.js: saveNewProduct(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al agregar el producto' }
    }
}

const updateProduct = async (req) => {
    try {
        const isValidId = idValidator(req.params.id)
        if (isValidId == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' } //PROBADO OK

        const productToUpdate = {
            id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            image: req.body.image,
            price: req.body.price,
            isAlternative: req.body.isAlternative,
            isTeam: req.body.isTeam
        }

        const isValid = productValidator(productToUpdate)
        if (isValid == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' } //PROBADO OK

        const result = await productDao.update(productToUpdate)

        if (result.error) {
            errorLogger.error(`productService.js: updateProduct(): ${result.error}`)
            return { status: 500, message: 'Error: Se produjo un error al modificar el producto' }
        } else {
            if (result.matchedCount == 1) {
                if (result.modifiedCount == 1) {
                    return { status: 200, message: 'Producto modificado con éxito' } //PROBADO OK
                } else {
                    return { status: 200, message: 'No se detectaron modificaciones' } //PROBADO OK
                }
            } else {
                return { status: 404, message: 'No se encontró el producto a modificar' } //PROBADO OK
            }
        }
    } catch (error) {
        errorLogger.error(`productService.js: updateProduct(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al modificar el producto' }
    }
}

const deleteProduct = async (req) => {
    try {
        const { id } = req.params

        const isValidId = idValidator(req.params.id)
        if (isValidId == false) return { status: 400, message: 'Ingrese los datos necesarios correctamente' } //PROBADO OK

        const result = await productDao.delete(id)

        if (result.error) {
            errorLogger.error(`productService.js: deleteProduct(): ${result.error}`)
            return { status: 500, message: 'Error: Se produjo un error al eliminar el producto' }
        } else {
            if (result.deletedCount == 1) {
                return { status: 200, message: 'Producto eliminado con éxito' } //PROBADO OK
            } else {
                return { status: 404, message: 'No se encontró el producto a eliminar' } //PROBADO OK
            }
        }
    } catch (error) {
        errorLogger.error(`productService.js: deleteProduct(): ${error}`)
        return { status: 500, message: 'Error: Se produjo un error al eliminar el producto' }
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    saveNewProduct,
    updateProduct,
    deleteProduct
}