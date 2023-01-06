const { Router } = require('express')
const {
    getMessages
} = require('../controllers/messageController')
const { isAuthenticated } = require('../middlewares/functions')

const messageRouter = Router()

messageRouter.get('/chat', isAuthenticated, getMessages)

module.exports = messageRouter