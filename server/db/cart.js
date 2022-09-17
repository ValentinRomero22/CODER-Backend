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
            fs.writeFile(`./db/${this.name}`, '[]', (error) =>{
                return false
            })

            return []
            /* if(error == 'ENOENT'){
                fs.writeFile(`./db/${this.name}`, '[]', (error) =>{
                    return false
                })

                return JSON.parse('[]')
            } else{
                return false
            } */
        }
    }

    async save(){
        let object = {}

        try{
            const allCarts = await this.getAll()

            const sortedArray = allCarts.sort((a, b) => a.id - b.id)

            /* const index = json.map(i => i.id).sort((a, b) =>{
                return a - b
            }) */

            sortedArray.length == 0
            ? object = { id: 1, ...object }
            : object = { id: sortedArray[sortedArray.length -1].id + 1, ...object }

            //const date = new Date().toLocaleDateString()
            object.timestamp = new Date()
            object.products = []
            
            allCarts.push(object)
            await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(allCarts))

            return object.id
        } catch(error){
            return false
        }
    }

    async deleteCart(id){
        const allCarts = await this.getAll()
        const filterCart = allCarts.filter((e) => e.id != id)

        try{
            if(allCarts.length != filterCart.length){
                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(filterCart))
                return true
            } else{
                return false
            }
        } catch(error){
            return false
        }
    }

    async getProductsByCart(id){
        const allCarts = await this.getAll()
        const cartFound = allCarts.find((e) => e.id == id)

        if(cartFound){
            if(cartFound.products){
                //const products = cart.products.map((p) => p)
                return cartFound
            } else{
                return null
            }
        } else{
            return null
        }        
    }

    async addToCart(id, object){
        const allCarts = await this.getAll()
        const cartFound = allCarts.find((e) => e.id == id)

        if(cartFound){
            try{
                cartFound.products.push(object)

                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(allCarts))
                return true
            } catch(error){
                return false
            }
        } else{
            return false
        }
    }

    async deleteProductOnCart(cartId, productId){
        const allCarts = await this.getAll()
        const cartFound = allCarts.find((e) => e.id == cartId)

        const large = cartFound.products.length
        cartFound.products = cartFound.products.filter((p) => p.id != productId)
        //cart.products = filterCart

        try{
            if(large != cartFound.products.length){
                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(allCarts))
                return true
            } else{
                return false
            }
        } catch(error){
            return false
        }
    }
}

module.exports = Cart