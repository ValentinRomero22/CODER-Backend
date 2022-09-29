import { model, Schema } from 'mongoose'

const messageSchema = new Schema(
    {
        author: {
            id: { type: String, required: true },
            name: { type: String, required: true },
            surname: { type: String, required: true },
            alias: { type: String, required: true },
            age: { type: Number, required: true },
            avatar: { type: String, required: true },
            _id: false,
        },
        date: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        versionKey: false,
    }
)

export const Message = model('messages', messageSchema)