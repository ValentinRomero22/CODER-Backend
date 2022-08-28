const express = require('express')
const productsRouter = require('./routes/productRouter')
const cartRouter = require('./routes/cartRouter')

const cors = require('cors')

const app = express()

const PORT = process.env.PORT || 8080
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/cart', cartRouter)
app.use('/api/products', productsRouter.productsRouter)

const isAdmin = require('./routes/productRouter')

app.get('/', (req, res) =>{
    res.json(isAdmin)
})

const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})