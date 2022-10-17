import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { 
    productsRouter,
    indexRouter, 
    loginRouter, 
    logoutRouter, 
    signupRouter, 
    randomRouter,
    infoRouter
} from './routes/main.routes.js'
import MongooseMessege from './controllers/mongooseMessage.js'
import { normalizedMessages } from './utils/messageNormalize.js'
import { engine } from 'express-handlebars'
import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import Users from './models/user.js'
import { createHash, isValidPassword } from './utils/bcryptPassword.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import mongoose from 'mongoose'
import redis from 'redis'
import connectRedis from 'connect-redis'
import { PORT, MONGOPAS } from './config.js'

const __filename = fileURLToPath(import.meta.url)

const app = express()
//const PORT = process.env.port || 8080
const httpServer = createServer(app)
const io = new Server(httpServer, {})

const __dirname = dirname(__filename)
app.use('/public', express.static(__dirname + '/public'))

httpServer.listen(PORT, () => console.log(`Servidor iniciado en el puerto ${PORT}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('view engine', 'hbs')
app.set('views', './views')

app.engine(
    'hbs',
    engine({
        extname: 'hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials',
    })
)

mongoose.connect(
    //'mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority',
    `mongodb+srv://valentin:${MONGOPAS}@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
).then(() => console.log('Conectado a Atlas...'))

const client = redis.createClient({ legacyMode: true })
client.connect()
const RedisStore = connectRedis(session)

passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
        Users.findOne({ username }, (error, user) => {
            if (error) {
                console.log(`Error login ${error}`)
                return done(error)
            }

            if (!user) {
                console.log(`Error usuario '${user}' no encontrado`)
                return done(null, false)
            }

            if (!isValidPassword(password, user)) {
                console.log(`Password '${password}' incorrecta`);
                return done(null, false)
            }

            return done(null, user)
        })
    })
)

passport.use("signup",
    new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            Users.findOne({ username: username }, function (error, user) {
                if (error) {
                    console.log(`Error login ${error}`)
                    return done(error)
                }

                if (user) {
                    console.log(`Usuario '${user}' ya existe`)
                    return done(null, false)
                }

                const newUser = { username: username, password: createHash(password) }

                Users.create(newUser, (error, userCreated) => {
                    if (error) {
                        console.log(`Error al guardar el usuario, error: ${error}`)
                        return done(error)
                    }

                    console.log('Usuario registrado correctamente')
                    return done(null, userCreated)
                })
            })
        }
    )
)

app.use(
    session({
        store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
        secret: "keyboard cat",
        cookie: {
            httpOnly: false,
            secure: false,
            //maxAge: 86400000,
            maxAge: 600000,
        },
        rolling: true,
        resave: true,
        saveUninitialized: false,
    })
);

app.use(passport.initialize())
app.use(passport.session())

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Users.findById(id, done);
});

app.use((req, res, next) => {
    req.session.touch();
    next();
});

/* app.get('/', (req, res) => {
    res.redirect('/login')
}) */

app.use('/', productsRouter)
app.use('/', loginRouter)
app.use('/', indexRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)
app.use('/', randomRouter)
app.use('/', infoRouter)

app.all('*', (req, res) =>{
    res.status(404).send('Ruta no encontrada')
})

const messagesController = new MongooseMessege()

io.on('connection', async (socket) => {
    const messages = await messagesController.getAll()
    const normalized = normalizedMessages(messages)

    io.sockets.emit('messages', normalized)

    socket.on('newMessage', async (clientMessage) => {
        let message = JSON.parse(clientMessage)
        await messagesController.save(message)

        let allMessages = await messagesController.getAll({ sort: true })
        io.sockets.emit('messages', normalizedMessages(allMessages))
    })
})