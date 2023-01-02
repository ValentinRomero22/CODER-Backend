const {
    getUserByIdService,
    updateUserService
} = require('../services/userService')
const { errorLogger } = require('../utils/winstonLogger')

const getUserById = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await getUserByIdService(userId)

        if (user) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Usuario encontrado',
                data: user
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'No se encontró el usuario buscado'
            })
        }
    } catch (error) {
        errorLogger.error(`userController.js | getUserByEmail(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const getUserByIdForm = async (req, res) => {
    try {
        const { userId } = req.params

        const user = await getUserByIdService(userId)

        if (user) {
            return res.status(200).render('pages/userForm', {
                user: user
            })
        } else {
            return res.status(404).render('pages/error', {
                statusCode: 404,
                message: 'No se encontró el usuario buscado'
            })
        }
    } catch (error) {
        errorLogger.error(`userController.js | getUserByEmail(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const userId = req.user._id.valueOf()

        const userToUpdate = {
            username: req.body.username,
            address: req.body.address,
            age: parseInt(req.body.age),
            phone: req.body.phone,
        }

        const result = await updateUserService(userId, userToUpdate)

        if (result) {
            return res.status(200).json({
                statusCode: 200,
                message: 'Datos actualizados correctamente'
            })
        } else {
            return res.status(404).json({
                statusCode: 404,
                message: 'Se produjo un error inesperado. Favor reintentar'
            })
        }
    } catch (error) {
        errorLogger.error(`userController.js | updateUser(): ${error}`)
        return res.status(500).render('pages/error', {
            statusCode: 500,
            user: req.user
        })
    }
}

module.exports = {
    getUserById,
    getUserByIdForm,
    updateUser
}