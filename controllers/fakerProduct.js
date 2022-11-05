const { newProducts } = require('../utils/productGenerator')
const { errorLogger } = require('../utils/winstonLogger')

const createProducts = {
    getProducts: async (req, res) =>{
        try{
            const products = await newProducts()
            
            if(products.length > 0) {
                res.status(200).render('pages/products', { products, productsExist: true, user: req.session.username })
            }
            else {
                res.status(200).render('pages/products', { products, productsExist: false, user: req.session.username })
            }  
        } catch(error){
            errorLogger.error(`fakerProduct: ${error.message}`)
            res.status(500).send({ error: 'error' })
        }
    }
}

module.exports = { createProducts }