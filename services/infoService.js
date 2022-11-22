const parseArgs = require('minimist')
const cpus = require('os')
const { PORT } = require('../config')
const { errorLogger } = require('../utils/winstonLogger')

const getInfo = (req, res) => {
    try {
        const args = parseArgs(process.argv.slice(2))

        let info = {
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

        return info
    } catch (error) {
        errorLogger.error(`infoService.js | getInfo(): ${error}`)
        return { error: error }
    }
}

module.exports = { getInfo }