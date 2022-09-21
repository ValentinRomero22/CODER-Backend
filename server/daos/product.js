const admin = require('firebase-admin')
const config = require('./db/tu-pilcha-uy-firebase-adminsdk-imquh-371094f117.json')

class Product{
    constructor(){
        if(!admin.apps.length){
            admin.initializeApp({
                credential: admin.credential.cert(config),
                databaseURL: 'https://tu-pilcha-uy.firebaseio.com'
            })
        }
    }

    async getAll(){
        try{
            const db = admin.firestore()
            const collection = db.collection('products')

            const products = await collection.get()
            
            const dataProducts = []
            products.forEach(doc =>{
                const data = doc.data()
                const dataProduct = { 
                    id: doc.id,
                    timestamp: data.timestamp,
                    name: data.name,
                    description: data.description,
                    code: data.code,
                    image: data.image,
                    price: data.price,
                    stock: data.stock
                }
                dataProducts.push(dataProduct)
            })

            return dataProducts
        } catch(error){
            throw Error()
        }
    }

    async getById(id){
        try{
            const db = admin.firestore()
            const collection = db.collection('products')
            const document = collection.doc(String(id))
            const dataProduct = await document.get()
            const data = dataProduct.data()

            const product = { 
                id: dataProduct.id,
                timestamp: data.timestamp,
                name: data.name,
                description: data.description,
                code: data.code,
                image: data.image,
                price: data.price,
                stock: data.stock
            } 

            return product
        } catch(error){
            throw Error()
        }
    }

    async save(product){
        try{
            const db = admin.firestore()
            const query = db.collection('products')
            const document = query.doc()
            await document.create({
                timestamp: new Date(),
                name: product.name,
                description: product.description,
                code: product.code, 
                image: product.image,
                price: product.price,
                stock: product.stock
            })
        } catch(error){
            throw Error()
        }
    }

    async update(product){
        try{
            const db = admin.firestore()
            const collection = db.collection('products')
            const document = collection.doc(product.id)

            await document.update({
                name: product.name,
                description: product.description,
                code: product.code, 
                image: product.image,
                price: product.price,
                stock: product.stock
            })
        } catch(error){
            throw Error()
        }
    }

    async delete(id){
        try{
            const db = admin.firestore()
            const collection = db.collection('products')
            const document = collection.doc(String(id))

            await document.delete()
        } catch(error){
            throw Error()
        }
    }
}

module.exports = Product