const mongoose = require('mongoose')
const { MONGO_CONNECTION } = require('../config/config')
const { infoLogger, errorLogger } = require('../utils/winstonLogger')

const mongoConnect = () =>{
    mongoose.connect(MONGO_CONNECTION, { useNewUrlParser: true })
        .then(() => infoLogger.info('Conectado a Atlas'))
        .catch((error) => errorLogger.error(`Mongo connect error: ${error}`))
}

module.exports = mongoConnect