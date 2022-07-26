const fs = require("fs")
const { resourceLimits } = require("worker_threads")

class Contenedor{
    
    constructor(name){
        this.name = `./${name}.json`
    } 

    async save(object){
        try{
            const json = await this.getAll()
            if(json == undefined){console.log('por aca')}
            
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

        const object = json.find(element => element.id === id)

        if(object){
            return object
        }
        else{
            return null
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
        const filterJson = json.filter((element) => element.id !== id)
        
        try{
            if(json.length != filterJson.length){
                await fs.promises.writeFile(this.name, JSON.stringify(filterJson))
                return "Objeto eliminado"
            }
            else{
                return `No se encontró el objeto con el id ${id}`
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
}

const objeto = new Contenedor("archivo")

const objeto1 = {
    nombre: "NOMBRE",
    apellido: "APELLIDO"
}

objeto.save(objeto1)
/* objeto.getById(2).then(x => console.log(x)) */
/* objeto.getAll().then(x => console.log(x))  */
/* objeto.deleteById(3).then(x => console.log(x)) */
/* objeto.deleteAll().then(x => console.log(x)) */