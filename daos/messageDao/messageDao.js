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