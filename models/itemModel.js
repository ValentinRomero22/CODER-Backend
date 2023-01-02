const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.ObjectId, required: true },
    quantity: { type: Number, required: true, minimum: 1 }
})

module.exports = itemSchema