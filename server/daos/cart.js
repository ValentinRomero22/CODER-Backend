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
            throw Error()
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
            throw Error()
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
            throw Error()
        } finally{
            mongoose.disconnect()
        }
    }

    async getProductsByCart(id){
        try{
            await this.mongoConnect()
            const cart = await cartSchema.findOne({ id: id })

            const products = cart.products.map((p) => p)
            return products
        } catch(error){
            throw Error()
        } finally{
            mongoose.disconnect()
        }
    }

    async addToCart(id, product){
        try{
            await this.mongoConnect()
            await cartSchema.updateOne({ id: id}, 
                { $push: { 'products' : product } })
        } catch(error){
            throw Error()
        } finally{
            mongoose.disconnect()
        }
    }

    async deleteProductOnCart(cartId, productId){
        try{
            await this.mongoConnect()
            const cart = await cartSchema.findOne({ id: cartId })
            console.log(cart.products)
            await cartSchema.updateOne(
                { id: cartId }, 
                { $pull: { products: { id: productId } } })
        } catch(error){
            throw Error()
        } finally{
            mongoose.disconnect()
        }
    }
}

module.exports = Cart