const { response } = require('express')
const fs = require('fs')

class Cart{
    constructor(name){
        this.name = `./${name}.json`
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(`./db/${this.name}`, 'utf-8')
            return JSON.parse(data)
        } catch(error){
            if(error == 'ENOENT'){
                fs.writeFile(`./db/${this.name}`, '[]', (error) =>{
                    return false
                })

                return JSON.parse('[]')
            } else{
                return false
            }
        }
    }

    async save(object){
        try{
            const json = await this.getAll()

            const index = json.map(i => i.id).sort((a, b) =>{
                return a - b
            })

            index.length == 0 ? 
                object = { id: 1, ...object } : 
                object = { id: index[index.length -1] + 1, ...object }

            const date = new Date().toLocaleDateString()
            object.timestamp = date

            object.products = []
            
            json.push(object)
            await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(json))

            return object.id
        } catch(error){
            return false
        }
    }

    async deleteCart(id){
        const json = await this.getAll()
        const filterJson = json.filter((e) => e.id != id)

        try{
            if(json.length != filterJson.length){
                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(filterJson))
                return true
            } else{
                return false
            }
        } catch(error){
            return false
        }
    }

    async getProductsByCart(id){
        const json = await this.getAll()
        const cart = json.find((e) => e.id == id)

        if(cart != null){
            if(cart.products){
                const products = cart.products.map((p) => p)
                return products
            } else{
                return null
            }
        } else{
            return null
        }        
    }

    async addToCart(id, object){
        const json = await this.getAll()
        const cart = json.find((e) => e.id == id)

        if(cart){
            try{
                cart.products.push(object)

                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(json))
                return true
            } catch(error){
                return false
            }
        } else{
            return false
        }
    }

    async deleteProductOnCart(cartId, productId){
        const json = await this.getAll()
        const cart = json.find((e) => e.id == cartId)

        const filterCart = cart.products.filter((p) => p.id != productId)
        cart.products = filterCart

        try{
            if(cart.length != filterCart.length){
                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(json))
                return true
            } else{
                return false
            }
        } catch(error){
            return false
        }
    }
}

//export default Cart
module.exports = Cart

//const cart = new Cart('cart')

/* cart.deleteProductOnCart(1, 3).then(response =>{
    console.log(response)
}) */

/* const newCart = {
    timestamp: "23/08/2022",
    productos: [
        {
            id: 4,
            timestamp: "06/08/2022",
            name: "Dortmund Local 2022",
            description: "Borussia Dortmund Local temporada 2022. Player edition. Marca Puma",
            code: "DorL2022",
            image: "http://dortmund.png",
            price: 1500,
            stock: 8
        }
    ]
} */

/* cart.save(newCart).then(response =>{
    console.log(response)
}) */

/* cart.deleteCart(1).then(response =>{
    console.log(response)
}) */

/* cart.getProductsByCart(1).then(response =>{
    console.log(response)
}) */

/* const newProduct = {
    id: 4,
    timestamp: "10/08/2022",
    name: "Dortmund Local 2022",
    description: "Borussia Dortmund Local temporada 2022. Fan edition. Marca Puma",
    code: "DorL2022",
    image: "http://dortmund.jpg",
    price: 1550,
    stock: 10
}

cart.addToCart(1, newProduct).then(response =>{
    console.log(response)
}) */