const { getRandom, postRandom } = require('../services/randomService')
const { errorLogger } = require('../utils/winstonLogger')

const random = {
    get: (req, res) => {
        getRandom(req, res)
            .then((response) => {
                res.status(200).render('pages/random', {
                    port: response
                })
            })
            .catch((error) => {
                errorLogger.error(`randomController.js | get(): ${error.message}`)
                res.status(500).send({ error: true })
            })
    },
    post: (req, res) =>{
        postRandom(req, res)
            .catch((error) =>{
                errorLogger.error(`randomController.js | post(): ${error.message}`)
                res.status(500).send({ error: true })
            })
    }
}

module.exports = { random }