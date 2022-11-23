const messageModel = require('../models/message')

const getAllMessages = async () => {
    try {
        const allMessages = await messageModel.find({})
        return allMessages
    } catch(error){
        return { error: error }
    }
}

const saveNewMessage = async(newMessage) =>{
    try{
        const result = await messageModel.create(newMessage)
        return result
    } catch(error){
        return { error: error }
    }
}

module.exports = {
    getAllMessages,
    saveNewMessage
}

/* class MessageDao{
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

module.exports = MessageDao */