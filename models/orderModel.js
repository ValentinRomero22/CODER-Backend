const mongoose = require('mongoose')
const itemSchema = require('./itemModel')

const orderSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    number: { type: Number, required: true, minimum: 1, index: { unique: true } },
    userId: { type: mongoose.Schema.ObjectId, required: true },
    userEmail: { type: String, required: true, maxLength: 100 },
    items: [itemSchema],
    status: { type: String, required: true },
    total: { type: Number, required: true, minimum: 1 },
    deliveryAddress: { type: String, required: true, maxLength: 100 },
    paymentMethod: { type: String, required: true, maxLength: 8 }
})

module.exports = mongoose.model('Orders', orderSchema)