const mongoose = require('mongoose')
const cartSchema = require('./schema/cartSchema')

class Cart{
    async mongoConnect(){
        try{
            const url = "mongodb+srv://valentin:valentin.1234@cluster0.kuinqws.mongodb.net/?retryWrites=true&w=majority"
            let connect = await mongoose.connect(url, { useNewUrlParser: true, useUniFiedTopology: true })
        } catch(error){
            //throw Error()
            return { error: 'error'}
        }
    }

    async getAll(){
        try{
            await this.mongoConnect()

            const carts = await cartSchema.find({})
            return carts
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    }

    async save(){
        let cart = {}

        try{
            cart.timestamp = new Date()
            cart.products = []

            await this.mongoConnect()
            const result = await cartSchema.create(cart)

            return result._id
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    } 

    async deleteCart(id){
        try{
            await this.mongoConnect()
            await cartSchema.deleteOne({ '_id': String(id) })
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    }

    async getProductsByCart(id){
        try{
            await this.mongoConnect()
            const cart = await cartSchema.findById(id)

            const products = cart.products.map((p) => p)
            return products
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    }

    async addToCart(id, product){
        try{
            await this.mongoConnect()
            await cartSchema.updateOne({ _id: String(id)}, 
                { $push: { 'products' : product } })
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    }

    async deleteProductOnCart(cartId, product){
        try{
            const { id, timestamp, name, description, code, image, price, stock} = product

            await this.mongoConnect()
            const result = await cartSchema.updateOne(
                { _id: String(cartId) }, 
                { $pull: { products:
                     { 
                        'id': id,
                        "timestamp": timestamp,
                        "name": name,
                        "description": description,
                        "code": code,
                        "image": image,
                        "price": price,
                        "stock": stock
                    } }})
                    
                if(result.modifiedCount == 0){
                    return { error: 'error' }
                }
        } catch(error){
            //throw Error()
            return { error: 'error'}
        } finally{
            mongoose.disconnect()
        }
    }
}

module.exports = Cart