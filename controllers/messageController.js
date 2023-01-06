const {
    getAllUserMessagesService,
} = require('../services/messageService')
const {
    getAllUsersService
} = require('../services/userService')
const { errorLogger } = require('../utils/winstonLogger')

const getMessages = async (req, res) => {
    try {
        if (req.user.isAdmin) {
            const users = await getAllUsersService()

            return res.status(200).render('pages/adminChat', {
                users: users,
                user: req.user
            })

        } else {
            const { email } = req.user

            const allMessages = await getAllUserMessagesService(email)

            return res.status(200).render('pages/userChat', {
                messages: allMessages,
                user: req.user
            })
        }
    } catch (error) {
        errorLogger.error(`messageController.js | getMessages(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

module.exports = {
    getMessages
}