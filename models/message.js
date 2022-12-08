const joi = require('joi')

class Messages {
    constructor(author, date, text) {
        this.author = author;
        this.date = date;
        this.text = text;
    }

    static messageValidate(message, required) {
        const messageSchema = joi.object({
            author: required ? joi.object().required() : joi.object(),
            date: required ? joi.date().required() : joi.date(),
            text: required ? joi.string().required : joi.string()
        })

        const { error } = messageSchema.validate(message)
        if (error) throw error
    }
}

module.exports = Messages

/* const mongoose = require('mongoose')

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

module.exports = mongoose.model('Messages', messageSchema) */