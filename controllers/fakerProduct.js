import { newProducts } from '../utils/productGenerator.js'

export const createProducts = {
    getProducts: async (req, res) =>{
        try{
            const products = await newProducts()
            
            if(products.length > 0) {
                res.status(200).render('products', { products, productsExist: true })
            }
            else {
                res.status(200).render('products', { products, productsExist: false })
            }  
        } catch(error){
            res.status(500).send({ error: 'error' })
        }
    }
}