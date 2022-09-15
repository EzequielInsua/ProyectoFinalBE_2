const express = require('express');
const container = require('./container.js');
const router = express.Router();

const filename = './data/productos.txt';
const contenedor = new container(filename);

const ENGINE = 'hbs';
// const ENGINE = 'pug';
// const ENGINE = 'ejs';

router.get('/', (req, res) => {
    if (ENGINE === 'hbs'){
        // * HANDLEBARS
        res.render("main", { layout: "index"});
    }else if (ENGINE === 'pug'){
        // * PUG
        res.render("index");
    }else{
        // * EJS
        res.render("ejs/index");
    }
});

router.get('/productos', async (req, res) => {
    try {
        const products = await contenedor.getAll();
        if (ENGINE === 'hbs'){
            // * HANDLEBARS
            res.render("main", { layout: "productos", products});
        }else if (ENGINE === 'pug'){
            // * PUG
            res.render("productos", {products});
        }else{
            // * EJS
            res.render("ejs/productos", {products});
        }
    } catch {
        res.send("Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.")
    }
    
})

router.post('/productos', async (req, res) => {
    const {title,price,thumbnail} = req.body
    try{
        await contenedor.save({title,price,thumbnail});
        if (ENGINE === 'hbs'){
            // * HANDLEBARS
            res.render("main", {layout: "index"});
        }else if (ENGINE === 'pug'){
            // * PUG
            res.render("index");
        }else{
            // * EJS
            res.render("ejs/index");
        }
    }catch(e) {
        return res.status(404).send({error:true, msg:"Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde."})
    }
    
});

// ! el resto de los get, pertenecen a los desafios anteriores

router.get('/productoRandom', async (req, res) => {
    try {
        const products = await contenedor.getAll();
        const index = Math.round(Math.random() * products.length);
        res.send(products[index]);
    } catch {
        res.send("Lo sentimos. Ha ocurrido un error. Intente nuevamente mas tarde.")
    }
})

router.get('/productos/:id', async (req, res) => {
    const {id} = req.query;
    try {
        const data = await contenedor.getById(parseInt(id));
        return res.send(data);
    } catch(e) {
        return res.status(404).send({error:true, msg:"Producto no encontrado"})
    }
})

router.put('/productos/:id', async (req, res) => {
    const {id} = req.query;
    try {
        const producto = await contenedor.editById(parseInt(id),req.body)
        return res.send({error:false, msg:"Producto Modificado", producto})
    }catch(e) {
        return res.status(404).send({error:true, msg:"Producto no encontrado"})
    }
});

router.delete('/productos/:id', async (req, res) => {
    try {
        const {id} = req.query;
        const data = await contenedor.deleteById(parseInt(id));
        return res.send({error:false, msg:"Producto Eliminado", data})
    } catch(e) {
        return res.status(404).send({error:true, msg:"Producto no encontrado"})
    }
});

module.exports = router;