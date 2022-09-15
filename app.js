const express = require('express');
const app = express();
const routerProducts = require('./products.js');
const PORT = 8080;
const handlebars = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use('/api', routerProducts);

const ENGINE = 'hbs';
// const ENGINE = 'pug';
// const ENGINE = 'ejs';



if (ENGINE === 'hbs') {
    app.engine(
        "hbs",
        handlebars.engine({
            extname: ".hbs",
            defaultLayout: "index.hbs",
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials'
        }),
    )
    app.set('view engine', 'hbs');
    app.set('views', './views');
    app.use(express.static('public'));
}else if(ENGINE === 'pug'){
    app.set("views", "./views");
    app.set("view engine", "pug");
}else{
    app.set("view engine", "ejs");
}

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});

server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );