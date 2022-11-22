const MessageDao = require('../daos/messageDao')
const { errorLogger } = require('../utils/winstonLogger')

const messageDao = new MessageDao()

const getAllMessages = async (options) => {
    try {
        let messages

        options?.sort == true
        ? messages = await messageDao.getAll({}).sort({ date: -1 })
        : messages = await messageDao.getAll({})
        
        return messages
    } catch (error) {
        errorLogger.error(`mongooseService.js | getAllMessages(): ${error}`)
        return { error: error }
    }
}

const saveNewMessage = async (message) => {
    try {
        message.date= new Date()

        const result = await messageDao.save(message)
        return !result && { error: 'error' }
    } catch (error) {
        errorLogger.error(`mongooseService.js | saveMessage(): ${error}`)
        return { error: error }
    }
}

module.exports = {
    getAllMessages, 
    saveNewMessage
}