const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        author: { type: Object, required: true },
        date: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Messages', messageSchema)