const fs = require('fs')

class Product{
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
                return 1
            }
        }
    }

    async getById(id){
        const json = await this.getAll()

        if(json){
            const object = json.find(e => e.id == id)

            if(object){
                return object
            } else{
                return null
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

            json.push(object)
            await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(json))

            return true
        } catch(error){
            return false
        }
    }

    async update(object){
        const json = await this.getAll()
        const product = json.find((o) => o.id == object.id)

        if(product){
            try{
                product.name = object.name
                product.description = object.description
                product.code = object.code
                product.image = object.image
                product.price = object.price
                product.stock = object.stock

                await fs.promises.writeFile(`./db/${this.name}`, JSON.stringify(json))                
                return true
            } catch(error){
                return false
            }
        } else{
            return false
        }
    }

    async delete(id){
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
}

//export default Product

module.exports = Product

//const product = new Product('product')

//product.getAll().then(x => console.log(x))
//product.getById(3).then(x => console.log(x))

/* const newProduct = {
    id: 4,
    timestamp: "10/08/2022",
    name: "Dortmund Local 2022",
    description: "Borussia Dortmund Local temporada 2022. Fan edition. Marca Puma",
    code: "DorL2022",
    image: "http://dortmund.jpg",
    price: 1550,
    stock: 10
} */

//product.save(newProduct)

//product.update(newProduct)
/* product.delete(2).then(response =>{
    console.log(response)
}) */