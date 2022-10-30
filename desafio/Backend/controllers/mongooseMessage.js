const Messages = require('../models/message')
const { MONGO_CONNECTION } = require('../config')
const { errorLogger } = require('../utils/winstonLogger')

class MongooseMessege{
    constructor() {
        try{
            MONGO_CONNECTION,
                { useNewUrlParser: true, useUniFiedTopology: true }
        } catch(error){
            errorLogger.error(`mongooseMessage: ${error.message}`)
            return { error: 'Error de conexión' }
        }
    }

    async getAll(options){
        try{
            let messages
            if(options?.sort == true){
                messages = await Messages.find({}).sort({ date: -1 })
            } else{
                messages = await Messages.find({})
            }

            return messages
        } catch(error){
            errorLogger.error(`mongooseMessage: ${error.message}`)
            return { error: 'error' }
        }
    }

    async save(message){
        try{
            message.date = new Date()

            const result = await Messages.create(message)
            if(!result) return { error: 'errorSave' }
        } catch(error){
            errorLogger.error(`mongooseMessage: ${error.message}`)
            return { error: 'error' }
        }
    }
}

module.exports = MongooseMessege