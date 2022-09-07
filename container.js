class Container {
    constructor(knex, table) {
        this.table = table
        this.knex = knex
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