const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true, maxLength: 100 },
    type: { type: String, required: true, maxLength: 7, minLength: 7 },
    timestamp: { type: String, required: true },
    text: { type: String, required: true }
})

module.exports = mongoose.model('Messages', messageSchema)