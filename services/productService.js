const { newProducts } = require('../utils/productGenerator')
const { errorLogger } = require('../utils/winstonLogger')

const getProducts = async (req, res) => {
    try {
        const products = await newProducts()

        return products.length > 0
        ? { products, productsExist: true, user: req.session.username }
        : { products, productsExist: false, user: req.session.username }
    } catch (error) {
        errorLogger.error(`productService.js | getProducts(): ${error}`)
        res.status(500).send({ error: true })
    }
}

module.exports = {
    getProducts
}