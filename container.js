const { options } = require("./options/mdb.js")
const knex = require("knex")(options)

knex.schema
    .createTable('chat', (table) =>{
        table.increments('id'),
        table.string('user'),
        table.string('message')
        table.datetime('datetime')
    })
    .then(() =>{
        console.log('okazo')
    })
    .catch((error) =>{
        console.log(error)
        throw new Error(error)
    })
    .finally(() =>{
        console.log('finally')
        knex.destroy()
    })