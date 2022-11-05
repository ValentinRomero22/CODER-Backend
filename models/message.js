const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        author: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            alias: { type: String, required: true },
            age: { type: Number, required: true },
            avatar: { type: String, required: true },
        },
        date: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Messages', messageSchema)