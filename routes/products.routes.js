import { Router } from 'express'
import { createProducts } from '../controllers/fakerProduct.js';

export const router = Router();

router.get('/', (req, res) =>{
    try{
        const resultado = createProducts()
        res.json(resultado)
    } catch(error){
        console.log(error)
    }
})