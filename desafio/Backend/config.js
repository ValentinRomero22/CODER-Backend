//import parseArgs from 'minimist'
const parseArgs = require('minimist')
//import * as dotenv from 'dotenv'
const dotenv = require('dotenv')

const options = { default: { PORT: 8080, MODE: 'FORK' }, alias: { p: 'PORT', m: 'MODE' } }
const args = parseArgs(process.argv.slice(2), options)
const PORT = args.PORT
const MODE = args.MODE

dotenv.config()

const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET_SESSION = process.env.SECRET_SESSION

module.exports = { SECRET_SESSION, MONGO_CONNECTION, PORT, MODE }