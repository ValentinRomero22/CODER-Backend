const {
    getAllProductsService,
    getProductByIdService,
    getProductByCategoryService,
    saveNewProductService,
    updateProductService,
    deleteProductService,
    enableProductService
} = require('../services/productService')
const { deleteProductToAllCartsService } = require('../services/cartService')
const { errorLogger } = require('../utils/winstonLogger')

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService()

        if (products.length > 0) {
            return res.status(200).render('pages/index', {
                products: products,
                user: req.user
            })
        } else {
            return res.status(404).render('pages/index', {
                user: req.user
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | getAllProducts(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await getProductByIdService(productId)

        if (product) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Producto encontrado',
                data: product
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el producto buscado'
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | getProductById(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getFormProduct = async (req, res) => {
    try {
        res.status(200).render('pages/newProduct', {
            user: req.user
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | getFormProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getDetailProductById = async (req, res) => {
    try {
        const { productId } = req.params

        const product = await getProductByIdService(productId)

        if (req.user.isAdmin) {
            return res.status(200).render('pages/productForm', {
                product: product,
                user: req.user
            })
        } else {
            return res.status(200).render('pages/productDetail', {
                product: product,
                user: req.user
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | getProductByCategory(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const { category } = req.params

        const products = await getProductByCategoryService(category)

        if (products.length > 0) {
            return res.status(200).render('pages/index', {
                products: products,
                user: req.user
            })
        } else {
            return res.status(404).render('pages/index', {
                user: req.user
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | getProductByCategory(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const saveNewProduct = async (req, res) => {
    try {
        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            image: req.body.image,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
            category: req.body.category,
            enabled: true
        }

        const result = await saveNewProductService(newProduct)

        if (result) {
            return res.status(201).json({
                statusCode: 201,
                message: 'Producto agregado con éxito'
            })
        } else {
            return res.status(400).json({
                statusCode: 400,
                message: 'Se produjo un error inesperado. Favor reintentar'
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | saveNewProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params

        const productToUpdate = {
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            image: req.body.image,
            price: parseInt(req.body.price),
            stock: parseInt(req.body.stock),
            category: req.body.category
        }

        const result = await updateProductService(productId, productToUpdate)

        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Producto modificado con éxito'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el producto indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | updateProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params

        await deleteProductToAllCartsService(productId)

        const result = await deleteProductService(productId)

        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Se modificó el estado del producto'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el producto indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | deleteProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const enableProduct = async (req, res) => {
    try {
        const { productId } = req.params
        const result = await enableProductService(productId)

        if (result.modifiedCount == 1) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Producto habilitado correctamente'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el producto indicado'
            })
        }
    } catch (error) {
        errorLogger.error(`productController.js | enableProduct(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getFormProduct,
    getDetailProductById,
    getProductByCategory,
    saveNewProduct,
    updateProduct,
    deleteProduct,
    enableProduct
}