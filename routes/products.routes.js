import { Router } from 'express'
import { createProducts } from '../controllers/fakerProduct.js';
//import { updateSessions, isLogged } from "../middlewares/functions.js"
const productsRouter = Router();

/* productsRouter.get('/api/productos-test', [isLogged, updateSessions], createProducts.getProducts) */
productsRouter.get('/api/productos-test', createProducts.getProducts)

export default productsRouter