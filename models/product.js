const joi = require('joi')

class Products {
    constructor(id, timestamp, name, description, code, price, stock, image, isAlternative, isTeam) {
        this.id = id
        this.timestamp = timestamp
        this.name = name
        this.description = description
        this.code = code
        this.price = price
        this.stock = stock
        this.image = image
        this.isAlternative = isAlternative
        this.isTeam = isTeam
    }

    static productValidate(product, required) {
        const productSchema = joi.object({
            id: joi.string(),
            timestamp: joi.date(),
            name: required ? joi.string().required() : joi.string(),
            description: required ? joi.string().required() : joi.string(),
            code: required ? joi.string().required() : joi.string(),
            price: required ? joi.number().required() : joi.number(),
            stock: required ? joi.number().required() : joi.number(),
            image: joi.string(),
            isAlternative: required ? joi.boolean().required() : joi.boolean(),
            isTeam: required ? joi.boolean().required() : joi.boolean()
        })

        const { error } = productSchema.validate(product)
        if (error) throw error
    }
}

module.exports = Products