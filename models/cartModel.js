const mongoose = require('mongoose')
/* const { productModel } = require('./productModel')
const { userModel } = require('./userModel') */

const cartSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId },
    products: [ { type: mongoose.Schema.ObjectId } ]
})

module.exports = mongoose.model('Carts', cartSchema)