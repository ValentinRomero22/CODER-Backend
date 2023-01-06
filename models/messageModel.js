const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true, maxLength: 100 },
    response: { type: Boolean, required: true },
    date: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Messages', messageSchema)