class ProductManager {
    constructor(){
        this.products = []
    }
    
    getProducts(){
        console.log(this.products)
        return this.products
    }

    addProduct({ title, description, price, thumbnail, stock }){

        let id = 0
        if (this.products.length===0) {
            id = 1
        } else {
            let lastEvent = this.products[this.products.length-1] 
            id = lastEvent.id + 1
        }

        let product = { title, description, price, thumbnail, stock, id }
        this.products.push(product)
    }

    getProductById(product_id){
        let one = this.products.find(each => each.id === product_id)
        if (one) {
            console.log(one)
            return one
        }
        console.log('not found')
        return null
    }

}

let prueba = new ProductManager()

prueba.addProduct({ title:"remera", description:"remeras de distintos colores", price: 10 , thumbnail: "./img/remera1.jpg" , stock: 5 })
prueba.addProduct({ title:"buzo", description:"diferente variedad de buzos", price: 30 , thumbnail: "./img/buzo1.jpg" , stock: 10 })
prueba.addProduct({ title:"gorra", description:"gorras de diferentes talles", price: 20 , thumbnail: "./img/gorra1.jpg" , stock: 8 })

prueba.getProductById(1)
prueba.getProductById(5)

prueba.getProducts()