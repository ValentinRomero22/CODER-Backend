import mongoose from 'mongoose'
import Messages from '../schema/messageSchema.js'

class MongooseMessege{
    constructor() {
        try{
            mongoose.connect('mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority'),
                { useNewUrlParser: true, useUniFiedTopology: true }
        } catch(error){
            return { error: 'Error de conexión' }
        }
    }

    async getAll(options){
        try{
            let messages
            if(options?.sort == true){
                messages = await Messages.find({}).sort({ date: -1 })
            } else{
                messages = await Messages.find({})
            }

            return messages
        } catch(error){
            return { error: 'error' }
        }
    }

    async save(message){
        try{
            message.date = new Date()

            const result = await Messages.create(message)
            if(!result) return { error: 'errorSave' }
        } catch(error){
            return { error: 'error' }
        }
    }
}

export default MongooseMessege