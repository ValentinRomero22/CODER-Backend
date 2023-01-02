const mongoose = require('mongoose')
const itemSchema = require('./itemModel')
const cartSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId, required: true },
    userEmail: { type: String, required: true },
    items: [itemSchema],
    deliveryAddress: { type: String, required: true, maxLength: 100 }
})

module.exports = mongoose.model('Carts', cartSchema)