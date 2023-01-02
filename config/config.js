//const parseArgs = require('minimist')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + '.env')
})

/* const options = { default: { PORT: 8080, MODE: 'FORK' }, alias: { p: 'PORT', m: 'MODE' } }
const args = parseArgs(process.argv.slice(2), options)
const PORT = process.env.PORT || 8080
const MODE = args.MODE */

const PORT = process.env.PORT || 8080
const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET_SESSION = process.env.SECRET_SESSION
const SESSION_MAX_AGE = process.env.SESSION_MAX_AGE

module.exports = { PORT, MONGO_CONNECTION, SECRET_SESSION, SESSION_MAX_AGE }