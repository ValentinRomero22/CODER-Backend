const MessageService = require('../services/messageService')
const { errorLogger } = require('../utils/winstonLogger')

class MessageController {
    constructor() {
        this.messageService = new MessageService()
    }

    getMessages = async () => {
        try {
            const messages = await this.messageService.getMessages()

            return messages
        } catch (error) {
            errorLogger.error(`messageController.js | getMessages(): ${error}`)
            return ({ error: error })
        }
    }

    saveMessage = async (newMessage) => {
        try {
            await this.messageService.saveMessage(newMessage)
        } catch (error) {
            errorLogger.error(`messageController.js | saveMessage(): ${error}`)
            return ({ error: error })
        }
    }
}

module.exports = MessageController

/* const { getAll, saveMessage } = require('../services/messageService')

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
} */