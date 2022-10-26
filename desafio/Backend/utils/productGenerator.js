const { faker } = require('@faker-js/faker')
faker.locale = 'es'

function newProducts(){
    const products = []

    for(let i = 0; i < 5; i++){
        products.push({
            id: faker.datatype.uuid(),
            name: faker.commerce.product(),
            price: faker.datatype.number({ min: 0, max: 999 }),
            image: faker.image.image(100, 100)
        })
    }

    return products
}

module.exports = { newProducts }