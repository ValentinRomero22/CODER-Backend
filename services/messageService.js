const { getAllMessages, saveNewMessage } = require('../daos/messageDao')
//const { errorLogger } = require('../utils/winstonLogger')

const getAll = async () => {
    try {
        const messages = await getAllMessages()

        
        /* options?.sort == true
        ? messages = await messageDao.getAll({}).sort({ date: -1 })
        : messages = await messageDao.getAll({}) */
        
        return messages
    } catch (error) {
        /* errorLogger.error(`mongooseService.js | getAllMessages(): ${error}`)
        return { error: error } */
        throw Error(error)
    }
}

const saveMessage = async (message) => {
    try {
        message.date= new Date()

        const result = await saveNewMessage(message)
        return result
    } catch (error) {
        /* errorLogger.error(`mongooseService.js | saveMessage(): ${error}`)
        return { error: error } */
        throw Error(error)
    }
}

module.exports = {
    getAll, 
    saveMessage
}