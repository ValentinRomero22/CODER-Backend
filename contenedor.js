const fs = require("fs")

class Contenedor{
    
    constructor(name){
        this.name = `./${name}.json`
    } 

    async save(object){
        try{
            const json = await this.getAll()
            
            const index = json.map(i => i.id).sort((a, b) =>{
                return a - b
            })

            if(index.length == 0){
                object.id = 1
                json.push(object)
                await fs.promises.writeFile(this.name, JSON.stringify(json))
            }
            else{
                object.id = index[index.length - 1] + 1
                json.push(object)
                await fs.promises.writeFile(this.name, JSON.stringify(json))
            }
            
            return object.id
        } 
        catch(error){
            console.log(`Error ${error}`)
        }
    }

    async getById(id){
        const json = await this.getAll()
        
        if(json){
            const object = json.find(element => element.id == id)

            if(object){
                return object
            }
            else{
                return null
            } 
        }
    }

    async getAll(){
        try{
            const data = await fs.promises.readFile(this.name, "utf-8")
            return JSON.parse(data)            
        }
        catch (error){
            if(error.code == "ENOENT"){
                fs.writeFile(this.name, "[]", (error) =>{
                    error && console.log(`Error ${error}`)
                })

                return JSON.parse("[]")
            } 
            else{
                console.log(`Error ${error}`)
            }
        }
    }

    async deleteById(id){
        const json = await this.getAll()
        const filterJson = json.filter((element) => element.id != id)
        
        try{
            if(json.length != filterJson.length){
                await fs.promises.writeFile(this.name, JSON.stringify(filterJson))
                return "Producto eliminado"
            }
        }
        catch(error){
            console.log(`Error ${error}`)
        }
    }

    async deleteAll(){
        try{
            fs.writeFile(this.name, "[]", (error) =>{
                error && console.log(`Error ${error}`)
            })

            return "Todos los objetos fueron eliminados"
        }
        catch(error){
            console.log(`Error ${error}`)
        }
    }

    async update(product){
        const json = await this.getAll()
        const aux = json.find((p) => p.id == product.id)

        if(aux){
            try{
                aux.title = product.title
                aux.price = product.price
                aux.thumbnail = product.thumbnail
    
                await fs.promises.writeFile(this.name, JSON.stringify(json))
                return aux
            }
            catch(error){
                console.log(`Error ${error}`)
            }
        } else{
            return null
        }

    }
}

const objeto = new Contenedor("productos")

const objeto1 = {
    nombre: "NOMBRE",
    apellido: "APELLIDO"
}

module.exports = Contenedor

/* objeto.save(objeto1) */
/* objeto.getById(2).then(x => console.log(x)) */
/* objeto.getAll().then(x => console.log(x))  */
/* objeto.deleteById(3).then(x => console.log(x)) */
/* objeto.deleteAll().then(x => console.log(x)) */