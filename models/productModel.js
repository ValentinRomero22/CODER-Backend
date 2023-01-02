const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    category: { type: String, required: true, maxLength: 20 },
    image: { type: String, required: true },
    price: { type: Number, required: true, minimum: 1, maximum: 99999 },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    enabled: { type: Boolean, required: true }
})

module.exports = mongoose.model('Products', productSchema)