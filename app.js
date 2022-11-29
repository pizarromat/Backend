// DESAFIO 1 - CLASES

/* class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota){
        this.mascotas.push(mascota);
    }
    countMascotas(){
        return this.mascotas.length;
    }
    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }
    getBookName(){
        let arr = [];
        for(let i = 0; i < this.libros.length; i++){
            arr.push(this.libros[i].nombre);
        }
        return arr;
    }
}

let Matias = new Usuario("Matias", "Pizarro", [
    {nombre: "El Código da Vinci", autor: "Dan Brown"},
    {nombre: "Crepúsculo", autor: "Stephenie Meyer"}
],  ["milo", "ambar"]);

console.log(Matias.getFullName());
Matias.addMascota("Gero");
console.log(Matias.countMascotas());
Matias.addBook("Lo que el viento se llevó", "Margaret Mitchell");
console.log(Matias.getBookName()); */


// DESAFIO 2 MANEJO DE ARCHIVOS EN JAVASCRIPT

const fs = require('fs');

class Contenedor {
    constructor(file){
        this.file = file;
    }

        //cree el metodo writeFile porq va a ser utilizado varias veces en diferentes metodos.
        writeFile = async data => {
            try{
                await fs.promises.writeFile(
                    this.file, JSON.stringify(data, null, 2)
                )
            }catch(err){
                console.log(`error: ${err}`);
            }
        }

        getAll = async() => {
            try {
                const productos = await fs.promises.readFile(this.file, 'utf-8');
                return JSON.parse(productos);
            }catch(err){
                //en caso de un error, el mensaje de error includes "El fichero o directorio no existe" osea que no lo encuentra o no aparece, va a retornar un array vacio ya que si retorna un arrays vacio y va a escribir el producto.txt, va a crear el archivo y no se frena el codigo en caso de otro error.
                if(err.message.includes('El fichero o directorio no existe')) return [];
                console.log(`error: ${err}`);
            }
        }
        

        save = async obj => {
            let productos = await this.getAll();
            try {
                let newId;
                productos.length === 0 ? newId = 1 : newId = productos[productos.length-1].id + 1;
                let newObj = {...obj, id: newId};
                productos.push(newObj);
                await this.writeFile(productos);
                return newObj.id;
            }catch(err){
                console.log(`error: ${err}`);
            }
        }

        getById = async id => {
            let productos = await this.getAll();
            try {
                const obj = productos.find(producto => producto.id === id);
                return obj ? obj : null;
            } catch(err){
                console.log(`error: ${err}`);
            }
        }

        deleteById = async id => {
            let productos = await this.getAll();
            try {
                productos = productos.filter(producto => producto.id != id);
                await this.writeFile(productos);
            }catch(err){
                console.log(`error: ${err}`);
            }
        }
        
        deleteAll = async() => {
            this.writeFile([]);
        }
    }
    
module.exports = Contenedor;