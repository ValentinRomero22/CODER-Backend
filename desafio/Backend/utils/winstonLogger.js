const { createLogger, format, transports } = require('winston')

module.exports = createLogger({
    format: format.combine(format.simple()),
    transports: [
        new transports.File({
            filename: `${__dirname}/../logs/logs.log`
        }),
        new transports.Console({
            level: 'debug'
        })
    ]
})