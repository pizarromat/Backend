class Usuario {
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
console.log(Matias.getBookName());