const mongoose = require('mongoose')
const { MONGO_CONNECTION } = require('../config')
const { errorLogger, infoLogger } = require('../utils/winstonLogger')

const mongoConnect = () => {
    mongoose.connect(MONGO_CONNECTION, {
        useNewUrlParser: true,
        useUniFiedTopology: true
    })
        .then(() => {
            infoLogger.info('Conectado a Atlas')
        })
        .catch((error) => {
            errorLogger.error(`Error al conectarse a Atlas: ${error}`)
        })
}

module.exports = mongoConnect