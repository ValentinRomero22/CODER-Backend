import { Router } from 'express'
import { createProducts } from '../controllers/fakerProduct.js'
import { isAuthenticated } from "../middlewares/functions.js"

const productsRouter = Router();

productsRouter.get('/api/productos-test', isAuthenticated, createProducts.getProducts)

export default productsRouter