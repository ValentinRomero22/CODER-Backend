const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    user: { type: Object, required: true },
    products: { type: Array, required: false }
})

module.exports = mongoose.model('Carts', cartSchema)