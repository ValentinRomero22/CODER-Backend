const {
    getAllUserMessagesDao,
    saveMessageDao
} = require('../daos/messageDao')
const { emailValidator, messageValidator } = require('../utils/validateData')

const getAllUserMessagesService = async (userEmail) => {
    try {
        const isValidEmail = emailValidator(userEmail)
        if (isValidEmail == false) throw Error('Error en los datos a utilizar')

        const allMessages = await getAllUserMessagesDao(userEmail)

        if (allMessages) {
            allMessages.forEach(message => {
                const formatDate = new Date(message.date)
                message.date = formatDate.toLocaleDateString()
            })
        }

        return allMessages
    } catch (error) {
        throw error
    }
}

const saveMessageService = async (newMessage) => {
    try {
        const isValidEmail = emailValidator(newMessage.email)

        if (isValidEmail == false) throw Error('Error en los datos a utilizar')

        const isValidMessage = messageValidator(newMessage)
        if (isValidMessage == false) throw Error('Complete los datos necesarios correctamente')

        await saveMessageDao(newMessage)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUserMessagesService,
    saveMessageService
}