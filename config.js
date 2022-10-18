import parseArgs from 'minimist'
import * as dotenv from 'dotenv'

const options = { default: { PORT: 8080 }, alias: { p: 'PORT' } }
const args = parseArgs(process.argv.slice(2), options)
const PORT = args.PORT

dotenv.config()

const MONGO_CONNECTION = process.env.MONGO_CONNECTION
const SECRET_SESSION = process.env.SECRET_SESSION

export { SECRET_SESSION, MONGO_CONNECTION, PORT }