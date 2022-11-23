const { getProducts } = require('../services/productService')
const { errorLogger } = require('../utils/winstonLogger')

const createProducts = (req, res) => {
    getProducts()
        .then((response) => {
            if (response.length > 0) {
                res.status(200).render('pages/products', {
                    products: response,
                    productsExist: true,
                    user: req.session.username
                })
            } else {
                res.status(200).render('pages/products', {
                    productsExist: false,
                    user: req.session.username
                })
            }
        })
        .catch((error) => {
            errorLogger.error(`productController.js || createProducts(): ${error.message}`)
            res.status(500).send({ error: error })
        })
}

module.exports = { createProducts }