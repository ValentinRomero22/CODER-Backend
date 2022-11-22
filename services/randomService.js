const { fork } = require('child_process')
const parseArgs = require('minimist')
const { errorLogger } = require('../utils/winstonLogger')

const getRandom = async (req, res) => {
    try {
        const args = parseArgs(process.argv.slice(2))

        return args !== undefined
            ? args.PORT
            : ''
    } catch (error) {
        errorLogger.error(`randomService.js | getRandom(): ${error}`)
        return { error: error }
    }
}

const postRandom = async (req, res) => {
    try {
        const quantity = req.query.quantity || 100000000

        const randomNumbers = fork('./utils/randomNumbers.js')
        randomNumbers.send({ message: 'start', quantity: quantity })

        randomNumbers.on('message', (object) =>{
            res.json(object)
        })
    } catch (error) {
        errorLogger.error(`randomService.js | postRandom(): ${error}`)
        return { error: error }
    }
}

module.exports = {
    getRandom, 
    postRandom
}