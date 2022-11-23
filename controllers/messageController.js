const { getAll, saveMessage } = require('../services/messageService')

const getAllMessages = async () => {
    try {
        const messages = await getAll()
        return messages
    } catch (error) {
        return error
    }
}

const saveNewMessage = async (message) => {
    try{
        const result = await saveMessage(message)
        return result
    } catch(error){
        return error
    }
}

module.exports = {
    getAllMessages,
    saveNewMessage
}