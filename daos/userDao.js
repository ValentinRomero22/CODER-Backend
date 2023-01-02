const userModel = require('../models/userModel')

const getUserByIdDao = async (userId) => {
    try {
        const userFound = await userModel.findById(userId)

        return userFound
    } catch (error) {
        throw error
    }
}

const updateUserDao = async (userId, userToUpdate) => {
    try {
        const result = await userModel.findByIdAndUpdate(userId, userToUpdate)
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    getUserByIdDao,
    updateUserDao
}