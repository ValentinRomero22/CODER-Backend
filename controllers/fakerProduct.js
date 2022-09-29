import { newProduct } from '../utils/productGenerator.js'

export const createProducts = () =>{
    const products = []
    
    for(let i = 0; i < 5; i++){
        products.push(newProduct())
    }

    return products
}