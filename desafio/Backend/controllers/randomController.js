const { fork } = require('child_process')
const parseArgs = require('minimist')
const { errorLogger } = require('../utils/winstonLogger')

const random = {
    get: (req, res) => {
        try {
            const args = parseArgs(process.argv.slice(2))
            res.status(200).render('pages/random', { port: args !== undefined ? args.PORT : '' })
        } catch (error) {
            errorLogger.error(`randomController: ${error.message}`)
            res.status(500).send({ error: true })
        }
    },
    post: async (req, res) => {
        try{
            const quantity = req.query.quantity || 100000000
            
            const randomNumbers = fork('./utils/randomNumbers.js')
            randomNumbers.send({ message: 'start', quantity: quantity })

            randomNumbers.on('message', (object) =>{
                res.json(object)
            })

        } catch(error){
            errorLogger.error(`randomController: ${error.message}`)
            res.status(500).send({ error: true })
        }
    }
}

module.exports = { random }