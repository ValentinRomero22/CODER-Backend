const parseArgs = require('minimist')
const cpus = require('os')
const { PORT } = require('../config/config')
const { getInfo } = require('../services/infoService')
const { errorLogger } = require('../utils/winstonLogger')

const info = {
    get: (req, res) => {
        try {
            const info = getInfo()

            return info.error
            ? res.status(500).send({ error: true })
            : res.render('pages/info', { info })
        } catch(error){
            errorLogger.error(`infoController: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    }
}

module.exports = { info }