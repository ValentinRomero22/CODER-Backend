const messageService = require('../services/messageService')
const { errorLogger } = require('../utils/winstonLogger')

const messageController = {
    getAllMessages: (req, res) => {
        messageService.getAllMessages()
            .then((response) => {
                console.log(response)
                return response
            })
            .catch((error) => {
                errorLogger.error(`messageController.js | getAll(): ${error}`)
                return { error: error }
            })
    },
    saveNewMessage: (req, res) => {
        messageService.saveNewMessage(message)
            .then((response) => {
                return response
            })
            .catch((error) => {
                errorLogger.error(`messageController.js | saveMessage(): ${error}`)
                return { error: error }
            })
    }
}

module.exports = messageController