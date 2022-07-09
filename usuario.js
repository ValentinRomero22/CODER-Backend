class Usuario{
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre
        this.apellido = apellido
        this.libros = libros
        this.mascotas = mascotas
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`
    }

    addMascota(pet){
        this.mascotas.push(pet)
    }

    countMascotas(){
        return this.mascotas.length 
    }

    addBook(name, author){
        this.libros.push({ nombre: name, autor: author })
    }

    getBookNames(){
        return this.libros.map((x) => x.nombre)
    }
}

const usuario = new Usuario('Valntin', 'Romero', [{ nombre:'El señor de las moscas', autor:'William Golding' }, { nombre:'Fundacion', autor:'Isaac Asimov' }], ['perro', 'gato'])

console.log(usuario.getFullName())
usuario.addMascota('loro')
console.log(usuario.countMascotas())
usuario.addBook('Game Of Thrones', 'George R. Martin')
console.log(usuario.getBookNames())

