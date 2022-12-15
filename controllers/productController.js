const ProductService = require('../services/productService')
//const ProductGraphqlService = require('../services/graphqlProductService.js')

class ProductController {
    constructor() {
        this.productService = new ProductService()
        //this.productGraphqlService = new ProductGraphqlService()
    }

    getProducts = async (req, res) => {
        if(req.params.id){
            res.status(200).render('pages/productsForm', {
                user: req.user
            })
        } else {
            res.status(200).render('pages/products', {
                user: req.user
            })
        }
    }

    newProduct = async (req, res) => {
        res.status(200).render('pages/newProduct', {
            user: req.user
        })
    }
}

module.exports = ProductController