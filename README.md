Para resolver este desafio, fui siguiendo los siguientes pasos:

Creo el require primero que todo

    const fs = require('fs')

1- Creo el class de ProductManager

    class ProductManager{}

2- Creo el constructor con el elemento "products", el cual es un array vacio.

    constructor(path) {
        this.products = []  //para guardar en la memoria todos los productos
        this.path = path   //para guardar en la memoria la ruta del archivo
        this.init(path)  //para iniciar la instancia y crear el archivo en caso de no existir o cargar la memoria en caso de existir productos
    }

3- Creo el "init" el cual va a ser el metodo que al definirse una instancia de la clase, va a crear el archivo.

    init(path) {   
        //verifico si existe el archivo
        let file = fs.existsSync(path)
        if (!file) {
            //si no existe lo creo
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            //si existe cargo los productos en la memoria del programa
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }

4- Creo el metodo "addProduct", el cual agrega los productos al array

    async addProduct({ title,description,price,thumbnail,code,stock }) {
            try {
                //defino el objeto que necesito agregar al array
                let data = { title,description,price,thumbnail,code,stock }
                //si la memoria tiene productos
                if (this.products.length>0) {
                    //busco el id del último elemento y le sumo 1
                    let next_id = this.products[this.products.length-1].id+1
                    //agrego la propiedad al objeto
                    data.id = next_id
                } else {
                    //en caso que no tenga: asigno el primer id
                    data.id = 1
                }
                //agrego el objeto (producto) a la memoria del programa
                this.products.push(data)
                //convierto a texto plano el array
                let data_json = JSON.stringify(this.products,null,2)
                //sobre-escribo el archivo
                await fs.promises.writeFile(this.path,data_json)
                console.log('created product: '+data.id)
                return 'product: '+data.id
            } catch(error) {
                console.log(error)
                return 'addProduct: error'
            }
        }



5- Luego cree el metodo "getProducts", con la funcion de devolver el array con los productos creados.

    getProducts() {
        try{
            //leer productos
            return this.products
        } catch(error) {
            console.log(error)
            return 'getProduct: error'
        }
    }


6- luego creo el ultimo metodo "getProductById", con la funcion de buscar en el array el producto que coincida con el id, y si no coincide con ninguno, mostrar el msj "not found"

    getProductById(id) {
        //luego utilizo el metodo find(), el cual devuelve el primer elemento del array, pero que en vez de buscar cualquier elemento, que busque el id y que se fije si es estrictamente igual al id ingresado.
        let one = this.products.find(each=>each.id===id)
        //pregunta si no se encuentra el id ingresado, entonces devuelve el mensaje getProductById: error'.
        if(!one) {
            console.log('getProductById: error')
            return null
        } else{
            //si el id ingresado coincide con alguno, lo devolvera
            console.log('finded product: '+id)
            return one
        }
    }

7- El metodo "updateProduct(id,data)" recibe un id y un objeto data con las propiedades que quiera modificar del producto.

    async updateProduct(id,data) {
        //data es el objeto con las propiedades que necesito modificar del producto
        try {
            //busco el producto
            let one = this.getProductById(id)
            //verifico si existe
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            // data debe tener propiedades a modificar
            if(Object.keys(data).length===0) {
                console.log('error: insert some product')
                return 'error: insert some product'
            }
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                one[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('updatedProduct: '+id)
            return 'updatedProduct: '+id
        } catch(error) {
            console.log(error)
            return 'updateProduct: error'
        }
    }

7- El ultimo metodo "deleteProduct(id)" se encarga de recibir como parametro el id del producto y borrar el producto del archivo.

    async deleteProduct(id) {
        try {
            //esta condicion me asegura que exista el producto, ya que si no existe no hay nada que borrar
            // si  no lo encuentra me devuelve un null
            let one = this.getProductById(id)  
            //verifico si existe
            if(!one) {
                console.log('Not found')
                return 'Not found'
            }
            //saco el usuario
            this.products = this.products.filter(each=>each.id!==id)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct: '+id)
            return 'deleteProduct: '+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct: error'
        }
    }


6- Luego al final, compruebo si los metodos funcionan correctamente agregando valores.

    async function manager() {
        let manager = new ProductManager('./data/data.json')
        await manager.addProduct({ title:"remeras",description:"remeras de colores",price:10,thumbnail:"foto remera",code:"rem",stock:4 })
        await manager.addProduct({ title:"gorras",description:"gorras de colores",price:5,thumbnail:"foto gorras",code:"gor",stock:10 })
        await manager.addProduct({ title:"buzos",description:"buzos de colores",price:20,thumbnail:"foto buzos",code:"buz",stock:8 })
        await manager.addProduct({ title:"pantalones",description:"pantalones de colores",price:15,thumbnail:"foto pantalones",code:"pan",stock:6 })
        await manager.addProduct({ title:"zapatillas",description:"zapatillas de colores",price:30,thumbnail:"foto zapatillas",code:"zap",stock:2 })
        await manager.addProduct({ title:"short",description:"short de colores",price:10,thumbnail:"foto short",code:"zap",stock:12 })
        await manager.addProduct({ title:"camperas",description:"camperas de colores",price:25,thumbnail:"foto camperas",code:"camp",stock:5 })
        await manager.addProduct({ title:"jean",description:"jean de colores",price:30,thumbnail:"foto jean",code:"jean",stock:15 })
        await manager.addProduct({ title:"camisas",description:"camisas de colores",price:25,thumbnail:"foto camisas",code:"cami",stock:10 })
        await manager.updateProduct(1,{ title:"short" })
        await manager.updateProduct(2,{ title:"campera", stock:15 })
        await manager.updateProduct(3,{})  
        await manager.deleteProduct(1)
        await manager.deleteProduct(130)
    }
    manager()