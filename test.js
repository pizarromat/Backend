const Contenedor = require('./app.js');

const products = new Contenedor('./products.txt');

const test = async () => {
    let save = await products.save({
        title: 'fideos',
        price: 1000,
        thumbnail: 'https://res.cloudinary.com/de2pmu5na/image/upload/v1667333065/fideos_uxeikx.jpg'
    });
    let getAll = await products.getAll();
    let getById = await products.getById(2);
    let deleteById = await products.deleteById(1);
    let deleteAll = await products.deleteAll();
    console.log(save);
    console.log(getAll);
    console.log(getById);
    console.log(deleteById);
    console.log(deleteAll);
};

test();