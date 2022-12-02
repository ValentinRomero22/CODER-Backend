const parseArgs = require('minimist')
const dotenv = require('dotenv')

const options = { default: { PORT: 8080, MODE: 'FORK' }, alias: { p: 'PORT', m: 'MODE' } }
const args = parseArgs(process.argv.slice(2), options)
const PORT = process.env.PORT || 8080 /* args.PORT */ //PARA MODO CLUSTER - FORK
const MODE = args.MODE

dotenv.config()

const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET_SESSION = process.env.SECRET_SESSION

module.exports = { SECRET_SESSION, MONGO_CONNECTION, PORT, MODE }