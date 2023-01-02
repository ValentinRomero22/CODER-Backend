const { Router } = require('express')
const {
    getUserById,
    getUserByIdForm,
    updateUser
} = require('../controllers/userController')
const { isAuthenticated } = require('../middlewares/functions')

const userRouter = Router()

userRouter.get('/usuario/:userId', isAuthenticated, /* getUserById */ getUserByIdForm)

userRouter.put('/usuario', isAuthenticated, updateUser)

module.exports = userRouter