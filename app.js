const express = require('express');
const app = express();
const routerProducts = require('./products.js');
const PORT = 8080;
const handlebars = require('express-handlebars');


app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use('/api', routerProducts);

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


const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
});

server.on( "Error", error => console.log(`Error while listening on port ${PORT}: ${error}`) );