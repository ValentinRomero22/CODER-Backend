const mongoose = require('mongoose')
const cartSchema = require('./schema/cartSchema')

class Cart{
    async mongoConnect(){
        try{
            const url = "mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority"
            let connect = await mongoose.connect(url, { useNewUrlParser: true, useUniFiedTopology: true })
        } catch(error){
            console.log(error)
        }
    }

    async getAll(){
        try{
            await this.mongoConnect()
            const carts = await cartSchema.find({})

            return carts
        } catch(error){
            return -1
        } finally{
            mongoose.disconnect()
        }
    }

    async save(){
        let cart = {}

        try{
            const allCarts = await this.getAll()

            const sortedArray = allCarts.sort((a, b) => a.id - b.id)

            sortedArray.length == 0
            ? cart = { id: 1, ...cart }
            : cart = { id: sortedArray[sortedArray.length -1].id + 1, ...cart }

            cart.timestamp = new Date()
            cart.products = []

            await this.mongoConnect()
            await cartSchema.create(cart)

            return cart.id
        } catch(error){
            //return -1
            console.log(error)
        } finally{
            mongoose.disconnect()
        }
    } 

    async deleteCart(id){
        try{
            await this.mongoConnect()
            const deleted = await cartSchema.deleteOne({ id: id })

            return deleted
        } catch(error){
            return -1
        } finally{
            mongoose.disconnect()
        }
    }

    async getProductsByCart(id){
        try{
            await this.mongoConnect()
            //const products = await cartSchema.products.find({ id: id})
            const cart = await cartSchema.findById(id)

            const products = cart.products.map()
            return products
        } catch(error){
            return -1
        } finally{
            mongoose.disconnect()
        }
    }

    async addToCart(id, product){
        try{
            await this.mongoConnect()
            await cartSchema.findByIdAndUpdate(id, 
                { $push: { 'products': product } },
                { strict: false },
                (error, result) =>{
                    if(error){
                        return -1
                    }
                })
        } catch(error){
            return -1
        } finally{
            mongoose.disconnect()
        }
    }

    async deleteProductOnCart(cartId, productId){
        try{
            await this.mongoConnect()
            await cartSchema.updateOne(({ id: id }), { $pull: { 'products': { 'id': productId } } })
        } catch(error){
            return -1
        } finally{
            mongoose.disconnect()
        }
    }
}

module.exports = Cart