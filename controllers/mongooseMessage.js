import mongoose, { connect, connect } from 'mongoose'
import { Message } from '../schema/messageSchema.js'

export class MongooseMessege{
    async mongoConnect(){
        try{
            const url = 'mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority'
            let connect = await connect(url, {
                useNewUrlParser: true,
                useUniFiedTopology: true
            })
        } catch(error){
            return { error: 'error' }
        }
    }

    async getAll(options){
        try{
            await this.mongoConnect()

            let messages
            if(options?.sort == true){
                messages = await Message.find({}).sort({ date: -1 })
            } else{
                messages = await Message.find({})
            }

            return messages
        } catch(error){
            return { error: 'error' }
        } finally{
            mongoose.disconnect()
        }
    }

    async save(message){
        try{
            const { author, text } = message
            const { id, name, surname, alias, age, avatar } = author

            const newMessage = new Message({
                author: {
                    id: id,
                    name: name,
                    surname: surname,
                    alias: alias,
                    age: age,
                    avatar: avatar,
                },
                date: new Date(),
                text: text
            })

            const result = await newMessage.save()
            if(!result) return { error: 'error' }
        } catch(error){
            return { error: 'error' }
        } finally{
            mongoose.disconnect()
        }
    }
}