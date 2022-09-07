const knex = require("knex")
/* import knex from "knex" */

const { options: SQLite } = require("./options/sqlite")
const { options: MySql } = require("./options/mdb")

const productKnex = knex(MySql)
const chatKnex = knex(SQLite)

const createTables = async () =>{
    await productKnex.schema.createTableIfNotExists('product', (table) =>{
        table.increments('id'),
        table.string('title'),
        table.float('price'),
        table.string('image')
    })

    await chatKnex.schema.createTableIfNotExists('chat', (table) =>{
        table.increments('id'),
        table.string('user'),
        table.string('message'),
        table.dateTime('datetime')
    })
}

module.exports = { createTables }