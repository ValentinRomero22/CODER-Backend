class Container {
    constructor(options, table) {
        this.table = table
        this.knex = require("knex")(options)

        knex.schema
            .createTableIfNotExists(table, (table) => {
                table.increments('id'),
                    table.string('user'),
                    table.string('message')
                table.datetime('datetime')
            })
            .then(() => {
                console.log(`Se creó la tabla ${table}`)
            })
            .catch((error) => {
                console.log(error)
                throw new Error(error)
            })
            .finally(() => {
                console.log('finally')
                knex.destroy()
            })
    }

    save(object) {
        const result = this.knex(this.table)
            .insert(object)
            .then((res) => res)
            .catch((error) => console.log(error))
        
        return result
    }

    getById(id){
        const data = this.knex(this.table)
            .where('id', id)
            .then((res) => res)
            .catch((error) => console.log(error))

        return data
    }

    getAll(){
        const data = this.knex(this.table)
            .select('*')
            .then((res) => res)
            .catch((error) => console.log(error))

        return data
    }

    deleteById(id){
        const result = this.knex(this.table)
            .where('id', id)
            .del()
            .then((res) => res)
            .catch((error) => console.log(error))

        return result
    }

    deleteAll(){
        const result = this.knex(this.table)
            .del()
            .then((res) => res)
            .catch((error) => console.log(error))

        return result
    }
}

module.exports = Container