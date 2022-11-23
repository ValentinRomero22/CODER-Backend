const { newProducts } = require('../utils/productGenerator')

const getProducts = async () => {
    try{
        const products = await newProducts()
        return products
    } catch(error){
        return { error: error }
    }
}

module.exports = {
    getProducts
}