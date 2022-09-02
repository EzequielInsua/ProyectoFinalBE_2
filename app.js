const express = require('express');
const Container = require('./container.js');

const PORT = 8089;
const filename = 'productos.txt';
const app = express();

const contenedor = new Container(filename);


app.get('/productos', async (req, res) => {
    try {
        const products = await contenedor.getAll();
        res.send( JSON.stringify( products ) );
    } catch {
        res.send("Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.")
    }
    
})


app.get('/productoRandom', async (req, res) => {
    try {
        const products = await contenedor.getAll();
        const index = Math.round(Math.random() * products.length);
        res.send( JSON.stringify( products[index] ) ) ;
    } catch {
        res.send("Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.")
    }
})



const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});



server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );
