import { Router } from 'express'
import { createProducts } from '../controllers/fakerProduct.js';

const productsRouter = Router();

productsRouter.get('/api/productos-test', createProducts.getProducts)

export default productsRouter