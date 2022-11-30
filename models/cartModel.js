const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    user: { type: Object, required: true },
    items: [
        { 
            product: { type: Object, required: true },
            quantity: { type: Number, required: true }
        }
    ],
    total: { type: Number, required: true }
})

module.exports = mongoose.model('Carts', cartSchema)