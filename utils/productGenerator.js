import { faker } from '@faker-js/faker'
faker.locale = 'es'

export const newProduct = () =>{
    return{
        id: faker.datatype.uuid(),
        name: faker.commerce.product(),
        price: faker.datatype.number({ min: 0, max: 999 }),
        image: faker.image.image(100, 100)
    }
}