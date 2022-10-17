import parseArgs from 'minimist'
import * as dotenv from 'dotenv'

dotenv.config()

const args = parseArgs(process.argv.slice(2))

//const SECRET = process.env.secret
const PORT = args.PORT || process.env.port || 8000 // NO TIENE QUE TOMARLO DESDE EL .ENV
const MONGOPAS = process.env.MONGOPAS

export { PORT, MONGOPAS }