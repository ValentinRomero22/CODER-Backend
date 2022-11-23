const { fork } = require('child_process')
const parseArgs = require('minimist')
const { errorLogger } = require('../utils/winstonLogger')

const getRandom = (req, res) => {
    try {
        const args = parseArgs(process.argv.slice(2))
        res.status(200).render('pages/random', {
            port: args !== undefined
                ? args.PORT
                : ''
        })
    } catch (error) {
        errorLogger.error(`randomController.js | getRandom(): ${error.message}`)
        res.status(500).send({ error: true })
    }
}

const postRandom = (req, res) => {
    try {
        const quantity = req.query.quantity || 100000000

        const randomNumbers = fork('./utils/randomNumbers.js')
        randomNumbers.send({ message: 'start', quantity: quantity })

        randomNumbers.on('message', (object) => {
            res.json(object)
        })

    } catch (error) {
        errorLogger.error(`randomController.js | postRandom(): ${error.message}`)
        res.status(500).send({ error: true })
    }
}

module.exports = {
    getRandom,
    postRandom
}