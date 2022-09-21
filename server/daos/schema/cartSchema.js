const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    //id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    products: { type: Array, require: false }

    /* id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    name: { type: String, require: true },
    description: { type: String, require: true },
    code: { type: String, require: true },
    image: { type: String, require: false },
    stock: { type: Number, require: true },
    price: { type: Number, require: true } */
})

module.exports = mongoose.model('carts', cartSchema)