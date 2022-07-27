const Contenedor = require("./contenedor")

const products = new Contenedor("productos")
let random = 0 

const express = require('express')
const app = express()
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})

server.on('error', error => console.log(`Error ${error}`))

app.get('/', (req, res) => {
    res.send({ Lista: '/productos', Random: '/productosRandom'})
})

app.get('/productos', (req, res) =>{
    (async () => {
        await products.getAll().then((response) =>{
            res.send(response)
        })
    })()
})

app.get('/productosRandom', (req, res) => {
    (async () => {
        await products.getAll().then((response) =>{
            random = Math.floor(Math.random() * response.length)
            res.send(response[random])
        })
    })()
})

