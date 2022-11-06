const express = require('express')
const http = require('http')
const { Server } = require('socket.io')
const {
    productsRouter,
    indexRouter,
    loginRouter,
    logoutRouter,
    signupRouter,
    randomRouter,
    infoRouter
} = require('./routes/main.routes')
const MongooseMessege = require('./controllers/mongooseMessage')
const { normalizedMessages } = require('./utils/messageNormalize')
const { engine } = require('express-handlebars')
const session = require('express-session')
const passport = require('passport')
const { Strategy: LocalStrategy } = require('passport-local')
const Users = require('./models/user')
const { createHash, isValidPassword } = require('./utils/bcryptPassword')
const mongoose = require('mongoose')
const redis = require('redis')
//const connectRedis = require('connect-redis')
const MongoStore = require('connect-mongo')
const { SECRET_SESSION, MONGO_CONNECTION, PORT, MODE } = require('./config')
const cluster = require('cluster')
const cpus = require('os')
const compression = require('compression')
const { infoLogger, warnlogger, errorLogger } = require('./utils/winstonLogger')

const app = express()
const httpServer = http.createServer(app)
const io = new Server(httpServer, {})
//console.log('Modo: ', MODE.toUpperCase())
infoLogger.info(`MODO: ${MODE.toUpperCase()}`)

//app.use(compression())

app.use('/public', express.static(__dirname + '/public'))

//BLOQUE FOREVER
if(cluster.isPrimary && MODE.toUpperCase() == "CLUSTER"){
    //console.log(`Master ${process.pid} is running`)
    infoLogger.info(`Master ${process.pid} is running`)
    
    for(let i = 0; i < cpus.cpus().length; i++){
        cluster.fork()
    }
    
    cluster.on('exit', (worker, code, signal) =>{
        cluster.fork()
        //console.log(`Worker ${worker.process.pid} died`)
        errorLogger.error(`Worker ${worker.process.pid} died`)
    })
} else{
    //httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    httpServer.listen(PORT, () => infoLogger.info(`Server started on port ${PORT}`))
    //console.log(`Worker ${process.pid} started`)
    infoLogger.info(`Worker ${process.pid} started`)
    //httpServer.on('error', () => console.log('Server error'))
    httpServer.on('error', () => errorLogger.error('Server error'))
}

//BLOQUE PM2
/* httpServer.listen(PORT, () => infoLogger.info(`Server started on port ${PORT}`))
//console.log(`Worker ${process.pid} started`)
infoLogger.info(`Worker ${process.pid} started`)
//httpServer.on('error', () => console.log('Server error'))
httpServer.on('error', () => errorLogger.error('Server error')) */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) =>{
    infoLogger.info(`URL: ${req.originalUrl} - METHOD: ${req.method}`)
    next()
})

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
    MONGO_CONNECTION,
    { useNewUrlParser: true }
)/* .then(() => console.log('Conectado a Atlas...')) */
.then(() => infoLogger.info('Conectado a Atlas'))

passport.use(
    "login",
    new LocalStrategy((username, password, done) => {
        Users.findOne({ username }, (error, user) => {
            if (error) {
                errorLogger.error(`Error login ${error}`)
                //console.log(`Error login ${error}`)
                return done(error)
            }

            if (!user) {
                errorLogger.error(`Error usuario ${user} no encontrado`)
                //console.log(`Error usuario '${user}' no encontrado`)
                return done(null, false)
            }

            if (!isValidPassword(password, user)) {
                errorLogger.error(`Password ${password} incorrecta`)
                //console.log(`Password '${password}' incorrecta`);
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
                    errorLogger.error(`Error login ${error}`)
                    //console.log(`Error login ${error}`)
                    return done(error)
                }

                if (user) {
                    errorLogger.error(`El usuario ${user} ya existe`)
                    //console.log(`Usuario '${user}' ya existe`)
                    return done(null, false)
                }

                const newUser = { username: username, password: createHash(password) }

                Users.create(newUser, (error, userCreated) => {
                    if (error) {
                        errorLogger.error(`Error al guardar el usuario, error: ${error}`)
                        //console.log(`Error al guardar el usuario, error: ${error}`)
                        return done(error)
                    }

                    infoLogger.info('Usuario registrado correctamente')
                    //console.log('Usuario registrado correctamente')
                    return done(null, userCreated)
                })
            })
        }
    )
)

//const client = redis.createClient({ legacyMode: true })
//const client = redis.createClient({ url: 'redis://redis-12369.c16.us-east-1-3.ec2.cloud.redislabs.com:12369' })
//client.connect()
//const RedisStore = connectRedis(session)

/* app.use(
    session({
        //store: new RedisStore({ host: "localhost", port: 6379, client, ttl: 300 }),
        store: new RedisStore({ client: client }),
        secret: SECRET_SESSION,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 600000,
        },
        rolling: true,
        resave: true,
        saveUninitialized: false,
    })
)*/

app.use(
    session({
        store: MongoStore.create({
            mongoUrl: MONGO_CONNECTION,
            mongoOptions:{
                useNewUrlParser: true,
                useUnifiedTopology:true,
            },
        }),
        secret: SECRET_SESSION,
        cookie: {
            httpOnly: false,
            secure: false,
            maxAge: 600000,
        },
        rolling: true,
        resave: true,
        saveUninitialized: false,
    })
)

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

app.use('/', productsRouter)
app.use('/', loginRouter)
app.use('/', indexRouter)
app.use('/', logoutRouter)
app.use('/', signupRouter)
app.use('/', randomRouter)
app.use('/', infoRouter)

app.all('*', (req, res) => {
    warnlogger.warn(`Ruta ${req.originalUrl} no encontrada`)
    //res.status(404).send('Ruta no encontrada...')
    res.render('pages/notFound', { ruta: req.originalUrl })
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