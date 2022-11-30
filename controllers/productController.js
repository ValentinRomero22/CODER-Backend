const {
    getAllProductsService,
    getProductByIdService,
    saveNewProductService,
    updateProductService,
    deleteProductService
} = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService()

        res.status(200).render('pages/index', {
            products: products,
            user: req.user
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | getAllProducts(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar mostrar los productos',
            user: req.user
        })
    }
}

const getProductById = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await getProductByIdService(productId)

        res.status(200).json({
            product: product
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | getProductById(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar buscar un producto',
            user: req.user
        })
    }
}

const getFormProduct = async (req, res) => {
    console.log('aca')
    try {
        res.status(200).render('pages/newProduct', {
            user: req.user
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | getFormProduct(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al renderizar la página',
            user: req.user
        })
    }
}

const getProductByIdForm = async (req, res) => {
    try {
        const { productId } = req.params
        const product = await getProductByIdService(productId)

        res.status(200).render('pages/productForm', {
            user: req.user,
            product: product
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | getProductByIdForm(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al renderizar la página',
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
            price: req.body.price,
            isAlternative: req.body.isAlternative,
            isTeam: req.body.isTeam
        }

        await saveNewProductService(newProduct)

        res.status(200).json({
            result: "Producto agregado correctamente"
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | saveNewProduct(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar guardar el producto',
            user: req.user
        })
    }
}

const updateProduct = async (req, res) => {
    try {
        const productToUpdate = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            code: req.body.code,
            price: req.body.price,
            isAlternative: req.body.isAlternative,
            isTeam: req.body.isTeam
        }

        await updateProductService(productToUpdate)

        res.status(200).json({
            result: "Producto modificado correctamente"
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | updateProduct(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar modificar el producto',
            user: req.user
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params
        await deleteProductService(productId)

        res.status(200).json({
            result: "Producto eliminado correctamente"
        })
    } catch (error) {
        errorLogger.error(`${req.user.username}: productController.js | deleteProduct(): ${error}`)
        res.status(500).render('pages/error', {
            error: 'Se produjo un error al intentar eliminar el producto',
            user: req.user
        })
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    getFormProduct,
    getProductByIdForm,
    saveNewProduct,
    updateProduct,
    deleteProduct
}