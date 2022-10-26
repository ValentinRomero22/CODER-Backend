const parseArgs = require('minimist')
const cpus = require('os')
const { PORT } = require('../config')

const info = {
    get: (req, res) => {
        try {
            const args = parseArgs(process.argv.slice(2))

            const info = {
                arguments: JSON.stringify(args),
                os: process.platform,
                version: process.version,
                memory: JSON.stringify(process.memoryUsage().rss, null, 2),
                path: process.execPath,
                processId: process.pid,
                directory: process.cwd(),
                cpusAmount: cpus.cpus().length,
                port: PORT,
            }

            res.render('pages/info', { info })
        } catch(error){
            return res.status(400).send({ error: true })
        }
    }
}

module.exports = { info }