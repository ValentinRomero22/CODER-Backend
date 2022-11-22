const { getProducts } = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

const createProducts = {
    getProducts: async (req, res) => {
        getProducts(req, res)
            .then((response) => {
                res.status(200).render('pages/products', {
                    products: response.products,
                    productsExist: response.productsExist,
                    user: response.user
                })
            })
            .catch((error) => {
                errorLogger.error(`fakerProduct || createProducts(): ${error.message}`)
                res.status(500).send({ error: 'error' })
            })
    }
}

module.exports = { createProducts }