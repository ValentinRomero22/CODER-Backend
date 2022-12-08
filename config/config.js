const parseArgs = require('minimist')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({
    path: path.resolve(process.cwd(), process.env.NODE_ENV + ".env")
})

//const options = { default: { PORT: 8080, MODE: 'FORK' }, alias: { p: 'PORT', m: 'MODE' } } ya no se utiliza por el puerto de heroku
const options = { default : { MODE: 'FORK' }, alias: { m: 'MODE' } }
const args = parseArgs(process.argv.slice(2), options)
//const PORT = args.PORT
const PORT = process.env.PORT || 8080
const MODE = args.MODE

const PERSISTANCE = process.env.PERSISTANCE

const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET_SESSION = process.env.SECRET_SESSION

module.exports = { PERSISTANCE, SECRET_SESSION, MONGO_CONNECTION, PORT, MODE }