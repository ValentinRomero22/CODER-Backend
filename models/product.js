const joi = require('joi')

class Products {
    constructor(name, price, image) {
        this.name = name;
        this.price = price;
        this.image = image;
    }

    static productValidate(product, required) {
        const productSchema = joi.object({
            name: required ? joi.string().required() : joi.string(),
            price: required ? joi.number().required() : joi.number(),
            image: required ? joi.string().required() : joi.string()
        })

        const { error } = productSchema.validate(product)
        if (error) throw error
    }
}

module.exports = Products