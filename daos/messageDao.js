const messageModel = require('../models/messageModel')

const getAllUserMessagesDao = async (userEmail) => {
    try {
        const allMessages = await messageModel.find(
            { email: userEmail }
        )
        return allMessages
    } catch (error) {
        throw error
    }
}

const saveMessageDao = async (newMessage) => {
    try {
        await messageModel.create(newMessage)
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUserMessagesDao,
    saveMessageDao
}