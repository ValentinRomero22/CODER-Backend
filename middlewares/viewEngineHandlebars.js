/* const { engine } = require('express-handlebars')

const viewEngineHandlebars = (app, express) => {
    app.use('/public', express.static(__dirname + '../public'))
    //console.log('view' + __dirname)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('view engine', 'hbs')
    app.set('views', './views')

    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
            defaultLayout: 'index.hbs',
            layoutsDir: __dirname + '../views/layouts',
            partialsDir: __dirname + '../views/partials',
        })
    )
}

module.exports = { viewEngineHandlebars } */