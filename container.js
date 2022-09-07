class Container {
    constructor(options, table) {
        this.table = table
        this.knex = require("knex")(options)
    }

    async createProductTable(tableName) {
        /* await this.knex.schema.hasTable(tableName).then((exists) => {
            if (!exists) { */
                this.knex.schema
                    .createTableIfNotExists(tableName, (table) => {
                        table.increments('id'),
                        table.string('title'),
                        table.float('price'),
                        table.string('image')
                    })
                    .then(() => {
                        console.log(`Se creó la tabla ${tableName}`)
                    })
                    .catch((error) => {
                        console.log(error)
                        //throw new Error(error)
                    })
                    .finally(() => {
                        console.log('finally')
                        this.knex.destroy()
                    })
            /* }
        }) */
    }

    async createChatTable(tableName) {
        /* await this.knex.schema.hasTable(tableName).then((exists) => {
            if (!exists) { */
                this.knex.schema
                    .createTableIfNotExists(tableName, (table) => {
                        console.log(tableName, '39')
                        table.increments('id'),
                        table.string('user'),
                        table.string('message'),
                        table.datetime('datetime')
                    })
                    .then(() => {
                        console.log(`Se creó la tabla chat`)
                    })
                    .catch((error) => {
                        console.log(error)
                        //throw new Error(error)
                    })
                    .finally(() => {
                        console.log('finally')
                        this.knex.destroy()
                    })
           /*  }
        }) */
    }

    async save(object) {
        const result = await this.knex(this.table)
            .insert(object)
            .then((res) => res)
            .catch((error) => console.log(error))

        return result
    }

    async getById(id) {
        const data = await this.knex(this.table)
            .where('id', id)
            .then((res) => res)
            .catch((error) => console.log(error))

        return data
    }

    async getAll() {
        const data = await this.knex(this.table)
            .select('*')
            .then((res) => res)
            .catch((error) => console.log(error))

        return data
    }

    async deleteById(id) {
        const result = await this.knex(this.table)
            .where('id', id)
            .del()
            .then((res) => res)
            .catch((error) => console.log(error))

        return result
    }

    async deleteAll() {
        const result = await this.knex(this.table)
            .del()
            .then((res) => res)
            .catch((error) => console.log(error))

        return result
    }
}

module.exports = Container