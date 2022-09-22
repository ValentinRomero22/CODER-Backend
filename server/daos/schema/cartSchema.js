const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    timestamp: { type: String, require: true },
    products: { type: Array, require: false }
})

module.exports = mongoose.model('carts', cartSchema)