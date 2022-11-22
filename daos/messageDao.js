const messageModel = require('../models/message')

class MessageDao{
    async getAll(){
        try{
            const messages = await messageModel.find({})
            return messages
        } catch(error){
            return { error: error }
        }
    }

    async save(message){
        try{
            const result = await messageModel.create(message)
            return result
        } catch(error){
            return { error: error }
        }
    }
}

module.exports = MessageDao