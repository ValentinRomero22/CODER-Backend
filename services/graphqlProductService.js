const { PERSISTENCE } = require('../config/config')
const ProductFactory = require('../daos/productDao/productFactory')
const { buildSchema } = require('graphql')

const productDao = ProductFactory.get(PERSISTENCE)

const productSchema = buildSchema(`
  type Product {
    _id: ID!
    name: String!
    description: String!
    code: String!
    price: Int!
    stock: Int!
    image: String
    isAlternative: Boolean!
    isTeam: Boolean!
  }
  input ProductInput {
    name: String!
    description: String!
    code: String!
    price: Int!
    stock: Int!
    image: String
    isAlternative: Boolean!
    isTeam: Boolean!
  }
  type Query {
    getProduct(id: ID!): Product,
    getProducts: [Product]!,
  }
  type Mutation {
    createProduct(data: ProductInput): Product
    updateProduct(id: ID!, data: ProductInput): Product,
    deleteProduct(id: ID!): Product,
  }
`)

getProduct = async (id) => {
  return await productDao.getProducts(id)
}

getProducts = async () => {
  return await productDao.getProducts()
}

createProduct = async (productToCreate) => {
  return await productDao.saveProduct(productToCreate)
}

updateProduct = async (productId) => {
  const _id = productId.id
  const {
    name, description, code, price, stock, image, isAlternative, isTeam
  } = productId.data

  const productToUpdate = {
    name, description, code, price, stock, image, isAlternative, isTeam
  }
  
  return await productDao.updateProduct(_id, productToUpdate)
}

deleteProduct = async (productId) => {
  return await productDao.deleteProduct(productId)
}


module.exports = {
  productSchema,
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}